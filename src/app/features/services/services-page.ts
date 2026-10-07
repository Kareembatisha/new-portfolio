import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../../core/i18n/i18n.service';
import { PROJECTS } from '../../data/projects';
import { SERVICE_DETAILS } from '../../data/service-details';
import { SERVICES } from '../../data/services';
import { CtaSection } from '../../shared/cta-section/cta-section';

@Component({
  selector: 'app-services-page',
  imports: [RouterLink, CtaSection],
  templateUrl: './services-page.html',
  styleUrl: './services-page.scss',
})
export class ServicesPage {
  protected readonly i18n = inject(I18n);
  protected readonly services = SERVICES.map((service) => {
    const detail = SERVICE_DETAILS.find((d) => d.id === service.id)!;
    const projects = detail.projects.flatMap((slug) => PROJECTS.find((p) => p.slug === slug) ?? []);
    return { service, detail, projects };
  });
}
