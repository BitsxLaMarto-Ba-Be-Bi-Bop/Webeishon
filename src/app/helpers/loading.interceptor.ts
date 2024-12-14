import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

export const LoadingInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    // Add endpoints to the array to exclude them to show spinner
    const excludedUrls: string[] = ['/chat-bot/send'];

    let totalRequests = 0;
    const spinnerService = inject(LoadingService);

    for (let i = 0; i < excludedUrls.length; i++) {
        const excludedUrl = excludedUrls[i];
        if (req.url.includes(excludedUrl)) {
            return next(req);
        }
    }

    totalRequests++;

    spinnerService.setLoading(true);

    return next(req).pipe(
        finalize(() => {
            totalRequests--;
            if (totalRequests == 0) {
                spinnerService.setLoading(false);
            }
        }),
    );
};
