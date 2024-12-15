import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AlertService } from '../../../services/alert.service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterModule, ReactiveFormsModule, PasswordModule, InputTextModule, ButtonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    private _alertService = inject(AlertService);
    private router = inject(Router);
    private readonly _authService = inject(AuthService);

    form: FormGroup = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });

    async login() {
        const credentials: { email: string; password: string } = this.form.value;
        const isLogged = await this._authService.login(credentials.email, credentials.password);
        if (!isLogged) {
            this._alertService.warning('Error al iniciar sesión', 'Error');
            return;
        } else this.router.navigateByUrl('/');
    }
}
