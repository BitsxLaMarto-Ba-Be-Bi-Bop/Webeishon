import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Paquetes de prime
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import CustomPreset from './prime-variables/custom-preset';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ErrorResponseInterceptor } from './helpers/error-response.interceptor';
import { LoadingInterceptor } from './helpers/loading.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: false,
                },
            },
        }),
        provideHttpClient(
            withFetch(),
            withInterceptors([JwtInterceptor, ErrorResponseInterceptor, LoadingInterceptor]),
        ),
    ],
};
