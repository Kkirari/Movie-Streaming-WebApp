import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export const PasswordValidator = (minLength: number, maxLength: number): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.value as string

        if (!password) {
            return { required: true }
        }
        else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return { invalidSpecialChar: true }


        }
        return null
    }

}