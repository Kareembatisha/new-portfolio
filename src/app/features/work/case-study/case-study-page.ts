import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../../../core/i18n/i18n.service';
import { PROJECTS } from '../../../data/projects';
import type { CaseStudyEntry } from '../../../models/project';
import { BeforeAfter } from '../../../shared/before-after/before-after';
import { CtaSection } from '../../../shared/cta-section/cta-section';
import { ProjectMedia } from '../../../shared/project-media/project-media';
import { ScreenshotGallery } from '../../../shared/screenshot-gallery/screenshot-gallery';
import { ScrollPreview } from '../../../shared/scroll-preview/scroll-preview';
import { ArchitectureDiagram } from './architecture-diagram';

@Component({
  selector: 'app-case-study-page',
  imports: [RouterLink, ProjectMedia, ArchitectureDiagram, CtaSection, ScrollPreview, BeforeAfter, ScreenshotGallery],
  templateUrl: './case-study-page.html',
  styleUrl: './case-study-page.scss',
})
export class CaseStudyPage {
  protected readonly i18n = inject(I18n);
  /** Bound from the route's `entry` resolver. */
  readonly entry = input.required<CaseStudyEntry>();

  protected readonly project = computed(() => this.entry().project);
  protected readonly study = computed(() => this.entry().study);
  protected readonly next = computed(() => {
    const index = PROJECTS.findIndex((p) => p.slug === this.project().slug);
    return PROJECTS[(index + 1) % PROJECTS.length];
  });
}
