import {FormGroup, ValidationErrors} from '@angular/forms';

export function getFormValidationErrors(form: FormGroup) {

    Object.keys(form.controls).forEach(key => {

        const controlErrors: ValidationErrors = form.get(key).errors;
        if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
                console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
            });
        }
    });
}
