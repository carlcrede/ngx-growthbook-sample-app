import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNgxGrowthbook } from 'ngx-growthbook';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideNgxGrowthbook({
      subscribeToChanges: true,
      backgroundSync: true,
      apiHost: 'https://cdn.growthbook.io',
      clientKey: 'sdk-eeaqNb4SLXF4xjHp',
      enableDevMode: true,
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
};
