import { Component, inject } from '@angular/core';
import { I18n } from '../../core/i18n/i18n.service';
import { CtaSection } from '../../shared/cta-section/cta-section';
import { AboutPreview } from './sections/about-preview';
import { Expertise } from './sections/expertise';
import { FeaturedWork } from './sections/featured-work';
import { Hero } from './sections/hero';
import { ProofStats } from './sections/proof-stats';
import { HowIWork } from './sections/how-i-work';
import { ServicesOverview } from './sections/services-overview';
import { Strengths } from './sections/strengths';

@Component({
  selector: 'app-home-page',
  imports: [
    Hero,
    Expertise,
    ProofStats,
    FeaturedWork,
    ServicesOverview,
    HowIWork,
    Strengths,
    AboutPreview,
    CtaSection,
  ],
  template: `
    <app-hero />
    <app-expertise />
    <app-proof-stats />
    <app-featured-work />
    <app-services-overview />
    <app-how-i-work />
    <app-strengths />
    <app-about-preview />
    <app-cta-section [title]="i18n.t('cta.title')" [lead]="i18n.t('cta.lead')" />
  `,
})
export class HomePage {
  protected readonly i18n = inject(I18n);
}
