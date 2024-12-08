import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { AuthInterceptor } from './services/auth.interceptor';
import { DatePipe } from '@angular/common';
import { StatisticsService } from './services/statistics.service';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([AuthInterceptor])), provideAnimationsAsync(),
    DatePipe,
    StatisticsService, provideCharts(withDefaultRegisterables()), provideCharts(withDefaultRegisterables())
  ],
};
