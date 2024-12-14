import { Component, inject } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { AuthService, RegisterFormValue } from '../auth.service';
import {
    ReactiveFormsModule,
    FormControl,
    FormGroup,
    Validators,
    AbstractControl,
    ValidatorFn,
    ValidationErrors,
} from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule, ButtonModule, InputTextModule, PasswordModule, RouterModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent {
    private _alertService = inject(AlertService);
    private readonly _authService = inject(AuthService);
    private readonly router = inject(Router);

    form: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        nif: new FormControl('', [Validators.required, this.dniValidator()]),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', [Validators.required, this.passwordMatch()]),
    });

    async register() {
        const val = this.form.value;
        delete val.confirmPassword;
        const resp = await this._authService.register(val);
        this._alertService.success("T'has registrat correctament", 'Registre');
        this.router.navigateByUrl('/login');
    }

    dniValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const dniControl = this.form?.get('nif');
            if (!dniControl || !dniControl.value) return null;
            const isValid = this.validateDni(dniControl.value);
            if (isValid) return null;
            dniControl.setErrors({ invalidDni: true });
            return { invalidDni: true };
        };
    }

    passwordMatch(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const passwordControl = this.form?.get('password');
            const confirmPasswordControl = this.form?.get('confirmPassword');
            if (!passwordControl || !confirmPasswordControl) return null;
            if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) return null;

            if (passwordControl.value !== confirmPasswordControl.value) {
                confirmPasswordControl.setErrors({ passwordMismatch: true });
                return { passwordMismatch: true };
            } else {
                confirmPasswordControl.setErrors(null);
                return null;
            }
        };
    }

    validateDni(dni: string): boolean {
        const dniRegex = /^\d{8}[A-Z]$/i;
        if (dniRegex.test(dni)) {
            const letter = dni.charAt(8).toUpperCase();
            const charIndex = parseInt(dni.substring(0, 8)) % 23;
            const validLetters = 'TRWAGMYFPDXBNJZSQVHLCKET';
            return validLetters.charAt(charIndex) === letter;
        }
        return false;
    }
}
