import { Component, inject, OnInit } from '@angular/core';
import { TitleComponent } from '../../shared/components/title/title.component';
import { UserService } from '../../services/user.service';
import { AppointmentCardComponent } from '../../shared/components/appointment-card/appointment-card.component';
import { Appointment, User } from '../../shared/interfaces/user.interface';
import { EmptyElementsComponent } from '../../shared/components/empty-elements/empty-elements.component';
@Component({
    selector: 'app-calendar',
    standalone: true,
    imports: [TitleComponent, AppointmentCardComponent, EmptyElementsComponent],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit {
    private userService = inject(UserService);
    appointments: Appointment[] = [];
    doctorId: any = this.userService.self()?.id;

    async ngOnInit() {
        await this.loadSelfAppointments();
    }

    async loadSelfAppointments() {
        if (!this.doctorId) {
            const doctor = await this.userService.getSelf();
            this.doctorId = doctor?.id;
        }
        let response: any = await this.userService.loadAllAppointments();
        // Filtrado de Appointments por id del doctor.
        if (response) response = response.filter((app: Appointment) => app.doctor_id == this.doctorId);
        this.appointments = response || [];
    }
}
