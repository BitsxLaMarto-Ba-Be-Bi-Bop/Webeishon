import { Component, inject } from '@angular/core';
import { PatientsService } from '../patients/patients.service';
import { Patient } from '../patients/patient.interface';
import { Tooltip } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { TitleComponent } from '../../shared/components/title/title.component';
import { EmptyElementsComponent } from '../../shared/components/empty-elements/empty-elements.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [TableModule, TitleComponent, Tooltip, EmptyElementsComponent, RouterModule],
    templateUrl: './users.component.html',
    styleUrl: './users.component.css',
})
export class UsersComponent {
    patients: Patient[] = [];
    private readonly _patientService = inject(PatientsService);

    async ngOnInit() {
        await this.loadListOfPatients();
    }

    async loadListOfPatients() {
        const response: any = await this._patientService.getAllUntratedPatients();
        this.patients = response;
    }

    async autoAssignations(idPatient: string) {
        const response: any = await this._patientService.getAssignmePatients(idPatient);
        await this.loadListOfPatients();
    }
}
