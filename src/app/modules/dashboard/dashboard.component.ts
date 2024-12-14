import { Component } from '@angular/core';
import { TitleComponent } from '../../shared/components/title/title.component';
@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [TitleComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
