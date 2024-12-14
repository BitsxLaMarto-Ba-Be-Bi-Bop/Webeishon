import { Component, inject, OnInit } from '@angular/core';
import { TitleComponent } from '../../shared/components/title/title.component';
import { UserService } from '../../services/user.service';
import { AppointmentCardComponent } from '../../shared/components/appointment-card/appointment-card.component';
import { Appointment } from '../../shared/interfaces/user.interface';
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

    async ngOnInit() {
        await this.loadSelfAppointments();
    }

    async loadSelfAppointments() {
        const response: any = await this.userService.loadSelfAppointments();
        this.appointments = response || [];
    }
}
