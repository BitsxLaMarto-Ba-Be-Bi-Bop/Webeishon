export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Appointment {
    id: number;
    doctor_id: number;
    patient_id: number;
    appointment_date: Date;
    reason: string;
    doctor_acception: boolean;
    created_at: Date;
    updated_at: Date;
}
