import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Appointment, User } from '../../interfaces/user.interface';
import { UserService } from '../../../services/user.service';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AlertService } from '../../../services/alert.service';

@Component({
    selector: 'appointment-card',
    standalone: true,
    imports: [DatePipe, Dialog, ButtonModule, CommonModule],
    templateUrl: './appointment-card.component.html',
    styleUrl: './appointment-card.component.css',
})
export class AppointmentCardComponent {
    @Input({ required: true }) appointment!: Appointment;
    @Output() appointmentChange = new EventEmitter<Appointment>();
    @Output() reloadAppointments = new EventEmitter<void>();

    private userService = inject(UserService);
    private readonly _alertService = inject(AlertService);

    patient: User | null = null;
    isOpen = false;

    async openDialog() {
        if (this.appointment.doctor_acception) return;
        await this.loadPatient();
        this.isOpen = true;
    }

    async loadPatient() {
        const patientId: string = this.appointment.patient_id.toString();
        const resp: any = await this.userService.getUser(patientId);
        this.patient = resp;
    }

    async confirmAppointment(confirm: boolean) {
        if (confirm) {
            // Se acepta la cita
            this.appointment.doctor_acception = true;
            await this.userService.acceptAppointment(this.appointment.id);
            this.appointmentChange.emit(this.appointment);
            this._alertService.success('', 'Cita confirmada correctament');
        } else {
            // Se rechaza la cita, por lo que se borra
            await this.userService.removeAppointment(this.appointment.id);
            this._alertService.success('', 'Cita cancel·lada correctament');
            this.reloadAppointments.emit();
        }
        this.isOpen = false;
    }
}
