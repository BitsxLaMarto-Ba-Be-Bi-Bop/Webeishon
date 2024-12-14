import { Component, Input } from '@angular/core';

@Component({
    selector: 'empty-elements-component',
    standalone: true,
    imports: [],
    templateUrl: './empty-elements.component.html',
    styleUrl: './empty-elements.component.css',
})
export class EmptyElementsComponent {
    @Input({ required: true }) text: string = '';
    @Input() icon: string = 'pi-info-circle';
}
