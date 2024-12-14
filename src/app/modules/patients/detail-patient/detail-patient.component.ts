import { Component, inject, OnInit } from '@angular/core';
import { PatientsService } from '../patients.service';
import { Patient } from '../patient.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-detail-patient',
    standalone: true,
    imports: [TitleComponent, InputTextModule, FormsModule, ReactiveFormsModule],
    templateUrl: './detail-patient.component.html',
    styleUrl: './detail-patient.component.css',
})
export class DetailPatientComponent implements OnInit {
    patientId: string = '';
    patient: Patient | null = null;
    loaded: boolean = false;

    private _patientService = inject(PatientsService);
    private activatedRoute = inject(ActivatedRoute);
    private router = inject(Router);

    form: FormGroup = new FormGroup({
        Sex: new FormControl('', Validators.required),
        Familia: new FormControl('', Validators.required),
        FamilialvsSporadic: new FormControl('', Validators.required),
        AgeAtDiagnosis: new FormControl('', Validators.required),
        BinaryDiagnosis: new FormControl('', Validators.required),
        FinalDiagnosis: new FormControl('', Validators.required),
        Tobacco: new FormControl('', Validators.required),
        Comorbidities: new FormControl('', Validators.required),
        RadiologicalPatter: new FormControl('', Validators.required),
        Biopsy: new FormControl('', Validators.required),
        PathologyPattern: new FormControl('', Validators.required),
        DiagnosisAfterBiopsy: new FormControl('', Validators.required),
        MultidsciplinaryCommittee: new FormControl('', Validators.required),
        Pirfenidone: new FormControl('', Validators.required),
        Nintedanib: new FormControl('', Validators.required),
        AntifibroticDrug: new FormControl('', Validators.required),
        Prednisone: new FormControl('', Validators.required),
        Mycophenolate: new FormControl('', Validators.required),
        Treatment: new FormControl('', Validators.required),
        ExtrapulmonaryAffectation: new FormControl('', Validators.required),
        AssociatedLungCancer: new FormControl('', Validators.required),
        OtherCancer: new FormControl('', Validators.required),
        BloodCountAbnormalityAtDiagnosis: new FormControl('', Validators.required),
        Anemia: new FormControl('', Validators.required),
        Thrombocytopenia: new FormControl('', Validators.required),
        Thrombocytosis: new FormControl('', Validators.required),
        Lymphocytosis: new FormControl('', Validators.required),
        Lymphopenia: new FormControl('', Validators.required),
        Neutrophilia: new FormControl('', Validators.required),
        Neutropenia: new FormControl('', Validators.required),
        Leukocytosis: new FormControl('', Validators.required),
        Leukopenia: new FormControl('', Validators.required),
        HematologicDisease: new FormControl('', Validators.required),
        LiverAbnormalityBeforeDiagnosis: new FormControl('', Validators.required),
        LiverAbnormality: new FormControl('', Validators.required),
        LDH: new FormControl('', Validators.required),
        ALT: new FormControl('', Validators.required),
        AST: new FormControl('', Validators.required),
        ALP: new FormControl('', Validators.required),
        GGT: new FormControl('', Validators.required),
        Transaminitis: new FormControl('', Validators.required),
        Cholestasis: new FormControl('', Validators.required),
        LiverDisease: new FormControl('', Validators.required),
        FVCLAtDiagnosis: new FormControl('', Validators.required),
        FVCPAtDiagnosis: new FormControl('', Validators.required),
        DLCOAtDiagnosis: new FormControl('', Validators.required),
        FVCLYearAfterDiagnosis: new FormControl('', Validators.required),
        FVCPYearAfterDiagnosis: new FormControl('', Validators.required),
        DLCOYearAfterDiagnosis: new FormControl('', Validators.required),
        RadioWorsening2y: new FormControl('', Validators.required),
        TypeOfFamilyHistory: new FormControl('', Validators.required),
        FirstDegreeRelative: new FormControl('', Validators.required),
        SecondDegreeRelative: new FormControl('', Validators.required),
        MoreThanOneDegreeRelative: new FormControl('', Validators.required),
        GeneticMutationStudiedInPatient: new FormControl('', Validators.required),
        SeverityOfTelomereShortening: new FormControl('', Validators.required),
        ProgressiveDisease: new FormControl('', Validators.required),
    });

    async ngOnInit() {
        this.patientId = this.activatedRoute.snapshot.paramMap.get('id') || '';
        if (!this.patientId) this.router.navigateByUrl('/patients');
        else await this.loadPatient();
    }

    async loadPatient() {
        this.loaded = false;
        const response: any = await this._patientService.getSinglePatient(this.patientId);
        this.patient = response;
        console.log('patient', response);
        this.loaded = true;
    }
}
