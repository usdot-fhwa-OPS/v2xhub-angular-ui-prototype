import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideAuth0({
      domain: 'dev-rghtg75jctjmqliq.us.auth0.com',
      clientId: 'hYQfXhn8PzvrFXwKZIddoQjhWPQQgm74',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ]
};
