import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Patient } from '../patient.interface';
import { RouterModule } from '@angular/router';
import { Tooltip } from 'primeng/tooltip';
import { PatientsService } from '../patients.service';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { EmptyElementsComponent } from '../../../shared/components/empty-elements/empty-elements.component';
@Component({
    selector: 'app-list-patients',
    standalone: true,
    imports: [TableModule, RouterModule, Tooltip, TitleComponent, EmptyElementsComponent],
    templateUrl: './list-patients.component.html',
    styleUrl: './list-patients.component.css',
})
export class ListPatientsComponent implements OnInit {
    patients: Patient[] = [];
    private readonly _patientService = inject(PatientsService);

    async ngOnInit() {
        await this.loadListOfPatients();
    }

    async loadListOfPatients() {
        const resp: any[] = await this._patientService.getMyPatients();
        this.patients = resp;
    }
}
