import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';

@Component({
    selector: 'loading-spinner',
    standalone: true,
    imports: [],
    templateUrl: './spinner.component.html',
    styleUrl: './spinner.component.css',
})
export class SpinnerComponent {
    readonly _loadingService = inject(LoadingService);
}
