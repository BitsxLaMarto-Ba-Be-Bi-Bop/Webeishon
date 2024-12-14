import { Component } from '@angular/core';
import { TitleComponent } from '../../shared/components/title/title.component';

@Component({
    selector: 'app-calendar',
    standalone: true,
    imports: [TitleComponent],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.css',
})
export class CalendarComponent {}
