import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { environment } from '../../environments';

export const JwtInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const baseUrl = environment.apiUrl;
    let refreshInProgress = false;
    const secondsUntillRefresh = 3600; // 1h
    const authService = inject(AuthService);

    // Skip jwt injection on foreign calls and auth calls
    if (!req.url.startsWith(baseUrl)) return next(req);

    const authToken: string = authService.getToken();

    // Skip jwt injection when the client is unidentified
    if (!authToken) return next(req);

    const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });

    // Pass the cloned request with the updated header to the next handler
    return next(authReq);
};
