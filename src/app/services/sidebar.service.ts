import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class SidebarService {
    doctorMenu: WritableSignal<MenuItem[]> = signal([
        {
            label: 'Pacients',
            icon: 'pi-users',
            routerLink: 'patients',
        },
        {
            label: 'Usuaris',
            icon: 'pi-user-plus',
            routerLink: 'users',
        },
        {
            label: 'Cites',
            icon: 'pi-calendar',
            routerLink: 'calendar',
        },
    ]);
}
