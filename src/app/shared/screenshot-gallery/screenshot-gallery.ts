import { Component, computed, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { I18n } from '../../core/i18n/i18n.service';
import type { GalleryItem } from '../../models/project';
import { ResponsiveImage } from '../responsive-image/responsive-image';
import { Reveal } from '../reveal/reveal';

/** Index after moving `delta` steps through a list of `length` items, wrapping around. */
export function stepIndex(index: number, delta: number, length: number): number {
  return length === 0 ? 0 : (((index + delta) % length) + length) % length;
}

/**
 * Thumbnail grid with a lightbox built on the native <dialog> element: focus is trapped inside it,
 * Escape closes it, and focus returns to the thumbnail that opened it. Arrow keys move between images
 * (reversed in RTL so "next" is always the way the language reads).
 */
@Component({
  selector: 'app-screenshot-gallery',
  imports: [ResponsiveImage, Reveal],
  templateUrl: './screenshot-gallery.html',
  styleUrl: './screenshot-gallery.scss',
})
export class ScreenshotGallery {
  protected readonly i18n = inject(I18n);
  readonly items = input.required<readonly GalleryItem[]>();

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  protected readonly active = signal<number | null>(null);
  protected readonly current = computed(() => {
    const index = this.active();
    return index === null ? null : this.items()[index];
  });
  private opener: HTMLElement | null = null;

  protected open(index: number, event: Event): void {
    this.opener = event.currentTarget as HTMLElement;
    this.active.set(index);
    const dialog = this.dialog().nativeElement;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }

  protected close(): void {
    const dialog = this.dialog().nativeElement;
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
    this.onClosed();
  }

  /** Runs for Escape, the close button and backdrop clicks alike. */
  protected onClosed(): void {
    this.active.set(null);
    this.opener?.focus();
    this.opener = null;
  }

  protected step(delta: number): void {
    const index = this.active();
    if (index !== null) this.active.set(stepIndex(index, delta, this.items().length));
  }

  protected onKey(event: KeyboardEvent): void {
    const forward = this.i18n.dir() === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
    const backward = this.i18n.dir() === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    if (event.key === forward) this.step(1);
    else if (event.key === backward) this.step(-1);
    else return;
    event.preventDefault();
  }

  /** A click on the dialog's own backdrop (outside the content box) closes it. */
  protected onBackdrop(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) this.close();
  }

  protected position(): string {
    return `${(this.active() ?? 0) + 1} / ${this.items().length}`;
  }
}
