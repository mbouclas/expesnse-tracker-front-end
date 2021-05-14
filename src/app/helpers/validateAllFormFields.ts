import {FormControl, FormGroup} from '@angular/forms';

export function validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
        const control = formGroup.get(field);             //{
        if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {        //{5}
            this.validateAllFormFields(control);            //{6}
        }
    });
}
