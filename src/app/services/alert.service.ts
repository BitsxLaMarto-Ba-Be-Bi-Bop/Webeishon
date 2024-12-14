import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    alert: EventEmitter<{ severity: string; title: string; text: string }> = new EventEmitter();
    /* SEVERITY DEL PRIME:
        - success: verde
        - info: azul 
        - warning: naranja
        - error: rojo
        - secondary: gris
        - contrast: negro
    
    */

    addAlert(severity: string, title: string, text: string) {
        this.alert.emit({ severity, title, text });
    }

    success(text: string, title: string = '') {
        this.alert.emit({ severity: 'success', title, text });
    }

    info(text: string, title: string = '') {
        this.alert.emit({ severity: 'info', title, text });
    }

    error(text: string, title: string = '') {
        this.alert.emit({ severity: 'error', title, text });
    }

    warning(text: string, title: string = '') {
        this.alert.emit({ severity: 'warn', title, text });
    }
}
