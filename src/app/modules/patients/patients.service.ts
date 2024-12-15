import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../services/user.service';

@Injectable({
    providedIn: 'root',
})
export class PatientsService {
    private readonly http = inject(HttpClient);
    private readonly userService = inject(UserService);
    private readonly baseUrl: string = environment.apiUrl;

    tobaccoValues = signal([
        { label: 'No ha fumat', value: 0 },
        { label: 'Fumador actiu', value: 1 },
        { label: 'Exfumador', value: 2 },
    ]);

    biopsyValues = signal([
        { label: "No s'ha biopsiat", value: 0 },
        { label: 'Criobiopsia endoscòpica', value: 1 },
        { label: 'Quirúrgica', value: 2 },
    ]);

    severityTelomere = signal([
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
    ]);

    finalDiagnosisValues = signal([
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
        { label: '7', value: 7 },
        { label: '8', value: 8 },
        { label: '9', value: 9 },
        { label: '10', value: 10 },
        { label: '11', value: 11 },
        { label: '12', value: 12 },
        { label: '13', value: 13 },
        { label: '14', value: 14 },
        { label: '15', value: 15 },
        { label: '16', value: 16 },
        { label: '17', value: 17 },
        { label: '18', value: 18 },
    ]);

    radiologicalPatterValues = signal([
        { label: 'UIP', value: 'UIP' },
        { label: 'Probable UIP', value: 'Probable UIP' },
        { label: 'Sense UIP', value: 'Non UIP' },
        { label: 'UIP indeterminat', value: 'Indeterminate UIP' },
    ]);

    genderValues = signal([
        { label: 'Home', value: 'Male' },
        { label: 'Dona', value: 'Female' },
    ]);

    familiarEsporadicValues = signal([
        { label: 'Familiar', value: 'Familial' },
        { label: 'Esporàdic', value: 'Sporadic' },
    ]);

    binaryDiagnosiValues = signal([
        { label: 'No IPF', value: 'No IPF' },
        { label: 'IPF', value: 'IPF' },
    ]);

    pathologyPatternValues = signal([
        { label: '0', value: '0' },
        { label: 'Necrotizing vasculitis', value: 'Necrotizing vasculitis' },
        { label: 'UIP', value: 'UIP' },
        { label: 'Granulomatosis', value: 'Granulomatosis' },
        { label: 'UIP probable', value: 'Probable UIP' },
        { label: 'AFOP', value: 'AFOP' },
        { label: 'RB-ILD', value: 'RB-ILD' },
        { label: 'OP', value: 'OP' },
        { label: 'Sense conclusió', value: 'Unconclusive' },
        { label: 'CHP', value: 'CHP' },
        { label: 'NSIP', value: 'NSIP' },
        { label: 'AFOP', value: 'AFOP' },
    ]);

    binaryValues = signal([
        { label: '0', value: 0 },
        { label: '1', value: 1 },
    ]);

    treatmentValues = signal([
        { label: 'Pirfenidone', value: 'Pirfenidone' },
        { label: 'Prednisone', value: 'Prednisone' },
        { label: 'MMF', value: 'MMF' },
        { label: 'Rituximab', value: 'Rituximab' },
        { label: 'Tacrolimus', value: 'Tacrolimus' },
        { label: 'Nintedanib', value: 'Nintedanib' },
        { label: 'No Data', value: 'No Data' },
        { label: 'RCT 1305-0012', value: 'RCT 1305-0012' },
        { label: 'MMF (3)', value: 'MMF (3)' },
        { label: 'Azathioprine', value: 'Azathioprine' },
        { label: 'Autotaxin Inhibitor', value: 'Autotaxin Inhibitor' },
        { label: 'Prednisone (2)', value: 'Prednisone (2)' },
        { label: 'NAC (2)', value: 'NAC (2)' },
        { label: 'Methotrexate', value: 'Methotrexate' },
        { label: 'Toxcilizumab', value: 'Toxcilizumab' },
        { label: 'Adalimumab', value: 'Adalimumab' },
        { label: 'Etanercept', value: 'Etanercept' },
        { label: 'Leflunomide', value: 'Leflunomide' },
        { label: 'Lebrikizumab', value: 'Lebrikizumab' },
        { label: 'Abatacept', value: 'Abatacept' },
        { label: 'Pembrolizumab', value: 'Pembrolizumab' },
        { label: 'Pemetrexed', value: 'Pemetrexed' },
        { label: 'Nintedanib (2)', value: 'Nintedanib (2)' },
        { label: 'NAC', value: 'NAC' },
        { label: 'G-CSF', value: 'G-CSF' },
        { label: 'Sulfasalazine', value: 'Sulfasalazine' },
        { label: 'Eculizumab', value: 'Eculizumab' },
        { label: 'Poor tolerance', value: 'Poor tolerance' },
    ]);

    hematologicDiseaseValue = signal([
        { label: 'No', value: 'No' },
        { label: 'Thalassemia', value: 'Thalassemia' },
        { label: 'Yes', value: 'Yes' },
        { label: 'Polycytemia', value: 'Polycytemia' },
        { label: 'Linfoma folicular', value: 'Linfoma folicular' },
        { label: 'Sd mielodisplasico', value: 'Sd mielodisplasico' },
        { label: 'Thalassemia minor', value: 'Thalassemia minor' },
        { label: 'ANAA 1:80', value: 'ANAA 1:80' },
        { label: 'FR +', value: 'FR +' },
        { label: 'ANA 1:80', value: 'ANA 1:80' },
    ]);

    yesNoValues = signal([
        { label: 'No', value: 'No' },
        { label: 'Yes', value: 'Yes' },
    ]);

    liverDiseaseValue = signal([
        { label: 'No', value: 'No' },
        { label: 'Liver cirrhosis', value: 'Liver cirrhosis' },
        { label: 'Fatty liver disease', value: 'Fatty liver disease' },
        { label: 'Fatty liver disease (2)', value: 'Fatty liver disease (2)' },
        { label: 'Esteatosis hepàtica', value: 'esteatosis hepática' },
        { label: '+ anti-HBc', value: '+ anti-HBc' },
        { label: 'HCV chronic liver disease', value: 'HCV chronic liver disease' },
        { label: 'Chronic alcohol liver disease', value: 'Chronic alcohol liver disease' },
        { label: 'Chronic alcohol liver disease (2)', value: 'Chronic alcohol liver disease (2)' },
        {
            label: 'Hepatic sarcoidosis with portal hypertension',
            value: 'Hepatic sarcoidosis with portal hypertension',
        },
        { label: 'Liver disease', value: 'Liver disease' },
    ]);

    familiyTypes = signal([
        { label: 'CPFE', value: 'CPFE' },
        { label: 'Unspecified PF', value: 'Unspecified PF' },
        { label: 'No history', value: 'No history' },
        { label: 'IPF', value: 'IPF' },
        { label: 'Dendriform ossification', value: 'Dendriform ossification' },
        { label: 'GPA', value: 'GPA' },
        { label: 'IPAF', value: 'IPAF' },
        { label: 'Dentriform ossification', value: 'Dentriform ossification' },
        { label: 'PF 2ary to cocaine', value: 'PF 2ary to cocaine' },
        { label: 'CHP', value: 'CHP' },
        { label: 'SRIF', value: 'SRIF' },
        { label: 'Myopathy', value: 'Myopathy' },
        { label: 'IPF (2)', value: 'IPF (2)' },
        { label: 'PF- CTD', value: 'PF- CTD' },
        { label: 'Unspecified PF (2)', value: 'Unspecified PF (2)' },
        { label: 'PF-CTD', value: 'PF-CTD' },
        { label: 'IV Sarco', value: 'IV Sarco' },
        { label: 'Fascioscapulohumeral muscular dystrophy', value: 'Fascioscapulohumeral muscular dystrophy' },
        { label: 'Scleroderma', value: 'scleroderma' },
        { label: 'Facioscapulohumeral Muscular Dystrophy', value: 'Facioscapulohumeral Muscular Dystrophy' },
        { label: 'PF-CTD (scleroderma)', value: 'PF-CTD (scleroderma)' },
        { label: 'PF-CTD (RA)', value: 'PF-CTD (RA)' },
        { label: 'NSIP', value: 'NSIP' },
        { label: 'Intersticial Pneumonia', value: 'Intersticial Pneumonia' },
        { label: 'Pneumoconiosis', value: 'Pneumoconiosis' },
        { label: 'IPF (3)', value: 'IPF (3)' },
        { label: 'FP no especificada', value: 'FP no especificada' },
        { label: 'RDT induced PF', value: 'RDT induced PF' },
        { label: 'Incipient ILD', value: 'Incipient ILD' },
        { label: 'IPF', value: 'IPF' },
        { label: 'IPF', value: 'IPF' },
        { label: 'IPF', value: 'IPF' },
        { label: 'IPF', value: 'IPF' },
        { label: 'IPF', value: 'IPF' },
        { label: 'IPF', value: 'IPF' },
        { label: 'IPF', value: 'IPF' },
    ]);

    radioWorsening = signal([
        { label: '0', value: 0 },
        { label: '1', value: 1 },
        { label: '3', value: 3 },
    ]);

    async getAllUntratedPatients() {
        const response = await firstValueFrom(
            this.http.get(`${this.baseUrl}/users/patients/untrated`, {
                observe: 'response',
            }),
        );
        return response.body;
    }

    async getMyPatients() {
        const id = this.userService.self()?.id;

        const response: any = await firstValueFrom(
            this.http.get(`${this.baseUrl}/users/patients/trated/${id}`, {
                observe: 'response',
            }),
        );

        return response.body;
    }

    async getAssignmePatients(patientId: string) {
        const idDoctor = this.userService.self()?.id;

        const response: any = await firstValueFrom(
            this.http.post(`${this.baseUrl}/users/doctors/${idDoctor}/patients/${patientId}`, {
                observe: 'response',
            }),
        );

        return response.body;
    }

    async getSinglePatient(patientId: string) {
        const response: any = await firstValueFrom(
            this.http.get(`${this.baseUrl}/users/${patientId}`, {
                observe: 'response',
            }),
        );

        return response.body;
    }

    async makePrediction(form: { [key: string]: any }) {
        const response: any = await firstValueFrom(
            this.http.post(`${this.baseUrl}/predict`, form, {
                observe: 'response',
            }),
        );

        return response.body;
    }
}
