import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'item-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './item-sidebar.component.html',
    styleUrl: './item-sidebar.component.css',
})
export class ItemSidebarComponent {
    @Input({ required: true }) item!: MenuItem;
    @Input({ required: true }) showText: boolean = false;

    private router = inject(Router);

    middleClick(e: any, item: MenuItem): void {
        if (item.routerLink == undefined) return;
        if (e.button == 1) {
            window.open(window.location.origin + '/' + item.routerLink, '_blank');
        }
        e.preventDefault();
    }

    isCurrentPage(item: MenuItem): boolean {
        const currentPage = '/' + this.router.url.substring(1);
        return (
            (currentPage.indexOf(item.routerLink) !== -1 && item.routerLink != '') ||
            item.expanded == true ||
            item.routerLink === currentPage
        );
    }
}
