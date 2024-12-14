import { Routes } from '@angular/router';
import { JwtGuard } from './guards/jwt.guard';
import { UserResolverService } from './resolvers/user.resolver';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./core/auth/login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: 'register',
        loadComponent: () => import('./core/auth/register/register.component').then((m) => m.RegisterComponent),
    },
    {
        path: '',
        loadComponent: () => import('./core/layout/layout.component').then((m) => m.LayoutComponent),
        canActivate: [JwtGuard],
        resolve: { data: UserResolverService },
        children: [
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./modules/dashboard/dashboard.component').then((m) => m.DashboardComponent),
            },
            {
                path: 'patients',
                loadComponent: () => import('./modules/patients/patients.component').then((m) => m.PatientsComponent),
                children: [
                    {
                        path: '',
                        loadComponent: () =>
                            import('./modules/patients/list-patients/list-patients.component').then(
                                (m) => m.ListPatientsComponent,
                            ),
                    },
                    {
                        path: ':id',
                        loadComponent: () =>
                            import('./modules/patients/detail-patient/detail-patient.component').then(
                                (m) => m.DetailPatientComponent,
                            ),
                    },
                ],
            },
            {
                path: 'users',
                loadComponent: () => import('./modules/users/users.component').then((m) => m.UsersComponent),
            },
            {
                path: 'calendar',
                loadComponent: () => import('./modules/calendar/calendar.component').then((m) => m.CalendarComponent),
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
        ],
    },
];
