import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { JwtService } from './core/auth/services/jwt.service';
import { UserService } from './core/auth/services/user.service';

export function initAuth(jwtService: JwtService, userService: UserService) {
  return async () => {
    if (jwtService.getToken() != null) {
      await userService.getCurrentUser().catch(() => {
        return Promise.resolve();
      });
    }
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAppInitializer(() => {
      const initializerFn = initAuth(inject(JwtService), inject(UserService));
      return initializerFn();
    }),
  ],
};
