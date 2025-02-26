import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { NgxSpinnerModule } from 'ngx-spinner'
import { CommonModule } from '@angular/common'
import { loadingInterceptor } from './_interceptors/loading.interceptor'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([loadingInterceptor])),
    importProvidersFrom(NgxSpinnerModule),
    importProvidersFrom(CommonModule),
  ]
}