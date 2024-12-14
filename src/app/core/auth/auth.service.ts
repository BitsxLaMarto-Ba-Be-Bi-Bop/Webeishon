import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
export interface RegisterFormValue {
    name: string;
    nif: string;
    email: string;
    password: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);
    private readonly baseUrl: string = environment.apiUrl;

    async login(mail: string, password: string): Promise<boolean> {
        const data = { mail, password };
        const response = await firstValueFrom(
            this.http.post(`${this.baseUrl}/login`, data, {
                observe: 'response',
            }),
        );
        const body: any = response.body;
        const token = body.token || '';
        localStorage.setItem('token', token);
        return token ? true : false;
    }

    async register(data: RegisterFormValue) {
        const response = firstValueFrom(this.http.post<RegisterFormValue>(`${this.baseUrl}/users/doctors`, data));
        return response;
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
    }

    getToken(): string {
        return localStorage.getItem('token') || '';
    }
}
