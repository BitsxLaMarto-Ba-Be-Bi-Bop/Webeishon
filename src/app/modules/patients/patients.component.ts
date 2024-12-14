import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
    selector: 'app-patients',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './patients.component.html',
    styleUrl: './patients.component.css',
})
export class PatientsComponent {}
