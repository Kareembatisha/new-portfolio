import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../../core/i18n/i18n.service';
import type { Project } from '../../models/project';
import { ProjectMedia } from '../project-media/project-media';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, ProjectMedia],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  protected readonly i18n = inject(I18n);
  readonly project = input.required<Project>();
  /** lead: wide, image beside text · default: image on top · compact: text only. */
  readonly variant = input<'lead' | 'default' | 'compact'>('default');
}
