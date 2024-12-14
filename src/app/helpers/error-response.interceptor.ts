import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { isPlatformServer } from '@angular/common';
import { AlertService } from '../services/alert.service';

export const ErrorResponseInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const router = inject(Router);
    const platformId = inject(PLATFORM_ID);
    const _alertService = inject(AlertService);

    return next(req).pipe(
        catchError((err: HttpErrorResponse) => {
            if (err.status === HttpStatusCode.InternalServerError)
                _alertService.error('Torna a intentar-ho més tard', 'Error');
            else {
                const msg = err.message;
                if (msg) _alertService.warning('', msg);
                else _alertService.warning('', 'Error');
            }

            // if (!isPlatformServer(platformId) && err.status === HttpStatusCode.Unauthorized) {}
            return throwError(() => err);
        }),
    );
};
