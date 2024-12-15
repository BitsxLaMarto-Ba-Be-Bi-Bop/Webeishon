import { Component, inject, OnInit } from '@angular/core';
import { PatientsService } from '../patients.service';
import { Patient } from '../patient.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select } from 'primeng/select';
import { InputNumber } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { EmptyElementsComponent } from '../../../shared/components/empty-elements/empty-elements.component';
import { Dialog } from 'primeng/dialog';

@Component({
    selector: 'app-detail-patient',
    standalone: true,
    imports: [
        TitleComponent,
        InputTextModule,
        FormsModule,
        ReactiveFormsModule,
        Select,
        InputNumber,
        ButtonModule,
        EmptyElementsComponent,
        Dialog,
    ],
    templateUrl: './detail-patient.component.html',
    styleUrl: './detail-patient.component.css',
})
export class DetailPatientComponent implements OnInit {
    patientId: string = '';
    patient: Patient | null = null;
    loaded: boolean = false;

    showPrediction = false;
    prediction: any = null;

    readonly _patientService = inject(PatientsService);
    private activatedRoute = inject(ActivatedRoute);
    private router = inject(Router);

    form: FormGroup = new FormGroup({
        // Sex: new FormControl(null, Validators.required),
        // FamilialvsSporadic: new FormControl(null, Validators.required),
        AgeAtDiagnosis: new FormControl(null, Validators.required),
        // BinaryDiagnosis: new FormControl(null, Validators.required),
        FinalDiagnosis: new FormControl(null, Validators.required),
        Tobacco: new FormControl(null, Validators.required),
        Comorbidities: new FormControl(null, Validators.required),
        // RadiologicalPattern: new FormControl(null, Validators.required),
        Biopsy: new FormControl(null, Validators.required),
        // PathologyPattern: new FormControl(null, Validators.required),
        DiagnosisAfterBiopsy: new FormControl(null, Validators.required),
        MultidsciplinaryCommittee: new FormControl(null, Validators.required),
        Pirfenidone: new FormControl(null, Validators.required),
        Nintedanib: new FormControl(null, Validators.required),
        AntifibroticDrug: new FormControl(null, Validators.required),
        Prednisone: new FormControl(null, Validators.required),
        Mycophenolate: new FormControl(null, Validators.required),
        // Treatment: new FormControl(null, Validators.required),
        ExtrapulmonaryAffectation: new FormControl(null, Validators.required),
        AssociatedLungCancer: new FormControl(null, Validators.required),
        OtherCancer: new FormControl(null, Validators.required),
        BloodCountAbnormalityAtDiagnosis: new FormControl(null, Validators.required),
        Anemia: new FormControl(null, Validators.required),
        Thrombocytopenia: new FormControl(null, Validators.required),
        Thrombocytosis: new FormControl(null, Validators.required),
        Lymphocytosis: new FormControl(null, Validators.required),
        Lymphopenia: new FormControl(null, Validators.required),
        Neutrophilia: new FormControl(null, Validators.required),
        // Neutropenia: new FormControl(null, Validators.required),
        Leukocytosis: new FormControl(null, Validators.required),
        Leukopenia: new FormControl(null, Validators.required),
        // HematologicDisease: new FormControl(null, Validators.required),
        // LiverAbnormalityBeforeDiagnosis: new FormControl(null, Validators.required),
        // LiverAbnormality: new FormControl(null, Validators.required),
        LDH: new FormControl(null, Validators.required),
        ALT: new FormControl(null, Validators.required),
        AST: new FormControl(null, Validators.required),
        ALP: new FormControl(null, Validators.required),
        GGT: new FormControl(null, Validators.required),
        Transaminitis: new FormControl(null, Validators.required),
        Cholestasis: new FormControl(null, Validators.required),
        // LiverDisease: new FormControl(null, Validators.required),
        FVCLAtDiagnosis: new FormControl(null, Validators.required),
        FVCPAtDiagnosis: new FormControl(null, Validators.required),
        DLCOAtDiagnosis: new FormControl(null, Validators.required),
        // FVCLYearAfterDiagnosis: new FormControl(null, Validators.required),
        // FVCPYearAfterDiagnosis: new FormControl(null, Validators.required),
        // DLCOYearAfterDiagnosis: new FormControl(null, Validators.required),
        RadioWorsening2y: new FormControl(null, Validators.required),
        // TypeOfFamilyHistory: new FormControl(null, Validators.required),
        FirstDegreeRelative: new FormControl(null, Validators.required),
        SecondDegreeRelative: new FormControl(null, Validators.required),
        MoreThanOneDegreeRelative: new FormControl(null, Validators.required),
        GeneticMutationStudiedInPatient: new FormControl(null, Validators.required),
        SeverityOfTelomereShortening: new FormControl(null, Validators.required),
        ProgressiveDisease: new FormControl(null, Validators.required),
    });

    async ngOnInit() {
        this.patientId = this.activatedRoute.snapshot.paramMap.get('id') || '';
        if (!this.patientId) this.router.navigateByUrl('/patients');
        else await this.loadPatient();
    }

    async loadPatient() {
        try {
            this.loaded = false;
            const response: any = await this._patientService.getSinglePatient(this.patientId);
            this.patient = response;
            this.loaded = true;
        } catch (error) {
            this.loaded = true;
        }
    }

    async makePrediction() {
        const formFormatted: { [key: string]: any } = this.getFormdata();
        const resp = await this._patientService.makePrediction(formFormatted);
    }

    async simulatePrediction() {
        const formFormatted: { [key: string]: any } = this.fillForm();
        const resp = await this._patientService.makePrediction(formFormatted);
        if (resp) {
            this.prediction = resp.predictions;
            this.showPrediction = true;
        }
    }

    getFormdata(): { [key: string]: any } {
        const rawValues = this.form.value;
        const formData: { [key: string]: any } = {};
        // formData['Sex'] = rawValues.Sex;
        // formData['FamilialvsSporadic'] = rawValues.FamilialvsSporadic;
        formData['Age at diagnosis'] = rawValues.AgeAtDiagnosis;
        // formData['Binary diagnosis'] = rawValues.BinaryDiagnosis;
        formData['Final diagnosis'] = rawValues.FinalDiagnosis;
        formData['TOBACCO'] = rawValues.Tobacco;
        formData['Comorbidities'] = rawValues.Comorbidities;
        // formData['Radiological Pattern'] = rawValues.RadiologicalPattern;
        formData['Biopsy'] = rawValues.Biopsy;
        // formData['Pathology pattern'] = rawValues.PathologyPattern;
        formData['Diagnosis after Biopsy'] = rawValues.DiagnosisAfterBiopsy;
        formData['Multidsciplinary committee'] = rawValues.MultidsciplinaryCommittee;
        formData['Pirfenidone'] = rawValues.Pirfenidone;
        formData['Nintedanib'] = rawValues.Nintedanib;
        formData['Antifibrotic Drug'] = rawValues.AntifibroticDrug;
        formData['Prednisone'] = rawValues.Prednisone;
        formData['Mycophenolate'] = rawValues.Mycophenolate;
        // formData['Treatment'] = rawValues.Treatment;
        formData['Extrapulmonary affectation'] = rawValues.ExtrapulmonaryAffectation;
        formData['Associated lung cancer'] = rawValues.AssociatedLungCancer;
        formData['Other cancer'] = rawValues.OtherCancer;
        formData['Blood count abnormality at diagnosis'] = rawValues.BloodCountAbnormalityAtDiagnosis;
        formData['Anemia'] = rawValues.Anemia;
        formData['Thrombocytopenia'] = rawValues.Thrombocytopenia;
        formData['Thrombocytosis'] = rawValues.Thrombocytosis;
        formData['Lymphocytosis'] = rawValues.Lymphocytosis;
        formData['Lymphopenia'] = rawValues.Lymphopenia;
        formData['Neutrophilia'] = rawValues.Neutrophilia;
        // formData['Neutropenia'] = rawValues.Neutropenia;
        formData['Leukocytosis'] = rawValues.Leukocytosis;
        formData['Leukopenia'] = rawValues.Leukopenia;
        // formData['Hematologic Disease'] = rawValues.HematologicDisease;
        // formData['Liver abnormality before diagnosis'] = rawValues.LiverAbnormalityBeforeDiagnosis;
        // formData['Liver abnormality'] = rawValues.LiverAbnormality;
        formData['LDH'] = rawValues.LDH;
        formData['ALT'] = rawValues.ALT;
        formData['AST'] = rawValues.AST;
        formData['ALP'] = rawValues.ALP;
        formData['GGT'] = rawValues.GGT;
        formData['Transaminitis'] = rawValues.Transaminitis;
        formData['Cholestasis'] = rawValues.Cholestasis;
        // formData['Liver disease'] = rawValues.LiverDisease;
        formData['FVC (L) at diagnosis'] = rawValues.FVCLAtDiagnosis;
        formData['FVC (%) at diagnosis'] = rawValues.FVCPAtDiagnosis;
        formData['DLCO (%) at diagnosis'] = rawValues.DLCOAtDiagnosis;
        // formData['FVC (L) 1 year after diagnosis'] = rawValues.FVCLYearAfterDiagnosis;
        // formData['FVC (%) 1 year after diagnosis'] = rawValues.FVCPYearAfterDiagnosis;
        // formData['DLCO (%) 1 year after diagnosis'] = rawValues.DLCOYearAfterDiagnosis;
        formData['RadioWorsening2y'] = rawValues.RadioWorsening2y;
        // formData['Type of family history'] = rawValues.TypeOfFamilyHistory;
        formData['1st degree relative'] = rawValues.FirstDegreeRelative;
        formData['2nd degree relative'] = rawValues.SecondDegreeRelative;
        formData['More than 1 relative'] = rawValues.MoreThanOneDegreeRelative;
        formData['Genetic mutation studied in patient'] = rawValues.GeneticMutationStudiedInPatient;
        formData['Severity of telomere shortening'] = rawValues.SeverityOfTelomereShortening;
        formData['Progressive disease'] = rawValues.ProgressiveDisease;
        return formData;
    }

    fillForm(): { [key: string]: any } {
        const values = {
            // Sex: 'Male',
            // 'FamilialvsSporadic': 'Sporadic',
            'Age at diagnosis': 18,
            // 'Binary diagnosis': 'No IPF',
            'Final diagnosis': 18,
            TOBACCO: 1,
            Comorbidities: 1,
            // Radiological Pattern: 1,
            Biopsy: 1,
            // 'Pathology pattern': 'Necrotizing vasculitis',
            'Diagnosis after Biopsy': 1,
            'Multidsciplinary committee': 1,
            Pirfenidone: 1,
            Nintedanib: 1,
            'Antifibrotic Drug': 1,
            Prednisone: 1,
            Mycophenolate: 1,
            // Treatment: 'Pirfenidone',
            'Extrapulmonary affectation': 1,
            'Associated lung cancer': 1,
            'Other cancer': 1,
            'Blood count abnormality at diagnosis': 1,
            Anemia: 1,
            Thrombocytopenia: 1,
            Thrombocytosis: 1,
            Lymphocytosis: 1,
            Lymphopenia: 1,
            Neutrophilia: 1,
            // Neutropenia: 1,
            Leukocytosis: 1,
            Leukopenia: 1,
            // 'Hematologic Disease': 'No',
            // 'Liver abnormality before diagnosis': 'Yes',
            // 'Liver abnormality': 'Yes',
            LDH: 0,
            ALT: 1,
            AST: 1,
            ALP: 0,
            GGT: 1,
            Transaminitis: 0,
            Cholestasis: 1,
            // LiverDisease: 'Fatty liver disease',
            'FVC (L) at diagnosis': 5,
            'FVC (%) at diagnosis': 23,
            'DLCO (%) at diagnosis': 100,
            // 'FVC (L) 1 year after diagnosis': 5,
            // 'FVC (%) 1 year after diagnosis': 23,
            // 'DLCO (%) 1 year after diagnosis': 23,
            RadioWorsening2y: 1,
            // 'Type of family history': 'No history',
            '1st degree relative': 0,
            '2nd degree relative': 1,
            'More than 1 relative': 1,
            'Genetic mutation studied in patient': 0,
            'Severity of telomere shortening': 6,
            'Progressive disease': 1,
        };
        return values;
    }
}
