import { Component, inject } from '@angular/core';
import { I18n } from '../../core/i18n/i18n.service';
import { SITE } from '../../core/site.config';
import { APPROACH, EDUCATION, SKILLS } from '../../data/about';
import { EXPERIENCE } from '../../data/experience';
import { CtaSection } from '../../shared/cta-section/cta-section';
import { Timeline } from '../../shared/timeline/timeline';

@Component({
  selector: 'app-about-page',
  imports: [Timeline, CtaSection],
  templateUrl: './about-page.html',
  styleUrl: './about-page.scss',
})
export class AboutPage {
  protected readonly i18n = inject(I18n);
  protected readonly approach = APPROACH;
  protected readonly skills = SKILLS;
  protected readonly education = EDUCATION;
  protected readonly experience = EXPERIENCE;
  protected readonly cv = SITE.cv;
}
