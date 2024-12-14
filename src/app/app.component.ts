import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { ToastModule } from 'primeng/toast';
import { ToastMessageOptions } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AlertService } from './services/alert.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, SpinnerComponent, ToastModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    providers: [MessageService],
})
export class AppComponent {
    constructor(private _messageService: MessageService, private _alertService: AlertService) {
        this._alertService.alert.subscribe((alert: { severity: string; title: string; text: string }) => {
            this._messageService.add({
                severity: alert.severity,
                summary: alert.title,
                detail: alert.text,
            });
        });
    }
}
