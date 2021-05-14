import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class CustomIconService {
    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) {}

    register(name: string, url: string) {
        this.matIconRegistry.addSvgIcon(
            name,
            this.domSanitizer.bypassSecurityTrustResourceUrl(url)
        );
    }
}
