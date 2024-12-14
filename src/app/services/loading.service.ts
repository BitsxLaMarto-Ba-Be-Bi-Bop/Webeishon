import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    loading: WritableSignal<Boolean> = signal(false);

    setLoading(loading: boolean) {
        this.loading.set(loading);
    }
}
