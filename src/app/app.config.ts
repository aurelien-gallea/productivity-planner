import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthenticationService } from './core/authentication.service';
import { AuthenticationFirebaseService } from './core/authentication-firebase.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), 
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    {
      provide: AuthenticationService,
      useClass: AuthenticationFirebaseService
    }
  ]
};
