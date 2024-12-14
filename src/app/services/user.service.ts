import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '../shared/interfaces/user.interface';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl: string = environment.apiUrl;

    self: WritableSignal<User | null> = signal(null);

    async getSelf(): Promise<User | null> {
        const response = await firstValueFrom(
            this.http.get(`${this.baseUrl}/me`, {
                observe: 'response',
            }),
        );
        const body: any = response.body;
        this.self.set(body);
        return this.self();
    }
}
