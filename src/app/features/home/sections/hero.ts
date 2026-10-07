import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../../../core/i18n/i18n.service';
import { SITE } from '../../../core/site.config';
import { ResponsiveImage } from '../../../shared/responsive-image/responsive-image';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, ResponsiveImage],
  template: `
    <section class="container hero">
      <div class="copy">
        <p class="eyebrow">{{ i18n.t('home.eyebrow') }}</p>
        <h1>{{ i18n.t('home.title') }}</h1>
        <p class="lead">{{ i18n.t('home.lead') }}</p>
        <p class="stack">Angular • TypeScript • RxJS • Signals</p>
        <div class="cta">
          <a class="btn btn--primary" [routerLink]="['/', i18n.lang(), 'work']">{{
            i18n.t('home.cta.work')
          }}</a>
          <a class="btn btn--secondary" [routerLink]="['/', i18n.lang(), 'contact']">{{
            i18n.t('cta.primary')
          }}</a>
        </div>
      </div>

      <div class="portrait">
        <app-responsive-image
          [image]="portrait"
          [alt]="i18n.t('portrait.alt')"
          sizes="(min-width: 56rem) 384px, 320px"
          [priority]="true"
        />
      </div>
    </section>
  `,
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly i18n = inject(I18n);
  protected readonly portrait = SITE.portrait;
}
