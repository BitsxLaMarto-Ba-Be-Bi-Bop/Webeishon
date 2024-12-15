import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit, signal, WritableSignal } from '@angular/core';
import { Appointment, User } from '../shared/interfaces/user.interface';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments';

@Injectable({
    providedIn: 'root',
})
export class UserService implements OnInit {
    private readonly http = inject(HttpClient);
    private readonly baseUrl: string = environment.apiUrl;

    self: WritableSignal<User | null> = signal(null);

    async ngOnInit() {
        await this.getSelf();
    }

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

    async getUser(userId: string): Promise<User | null> {
        const response: any = await firstValueFrom(
            this.http.get(`${this.baseUrl}/users/${userId}`, {
                observe: 'response',
            }),
        );
        return response.body;
    }

    async loadAllAppointments() {
        const response = await firstValueFrom(
            this.http.get(`${this.baseUrl}/appoinments/`, {
                observe: 'response',
            }),
        );
        return response.body;
    }

    async acceptAppointment(appointment: Appointment) {
        const response = await firstValueFrom(
            this.http.put(`${this.baseUrl}/appoinments/${appointment.id}`, appointment, {
                observe: 'response',
            }),
        );
        return response;
    }
    async removeAppointment(appointmentId: number) {
        const response = await firstValueFrom(
            this.http.delete(`${this.baseUrl}/appoinments/${appointmentId}`, {
                observe: 'response',
            }),
        );
        return response;
    }
}
