import { Component, inject } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';
import { ItemSidebarComponent } from './item-sidebar/item-sidebar.component';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../core/auth/auth.service';
@Component({
    selector: 'sidebar',
    standalone: true,
    imports: [ItemSidebarComponent, ButtonModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
    sidebarService = inject(SidebarService);
    readonly authService = inject(AuthService);
    isLocked: boolean = false;
}
