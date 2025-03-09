import { Component, inject, signal } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'

import { CommonModule } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { provideNativeDateAdapter } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatRadioModule } from '@angular/material/radio'
import { MatCardModule } from '@angular/material/card'
import { AccountService } from '../_services/account.service'
import { Router } from '@angular/router'
import { PasswordMatchValidator } from '../_helpers/password-mathch.validator'
import { PasswordValidator } from '../_helpers/password.validator'

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatDatepickerModule, MatRadioModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  mode: 'login' | 'register' = 'login'
  form: FormGroup
  errorFormServer = ''
  private accountService = inject(AccountService)
  private router = inject(Router)

  errorMessages = {
    username: signal(''),
    password: signal(''),
    confirm_password: signal(''),
  }

  constructor() {
    this.form = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
      password: new FormControl(null, [Validators.required, PasswordValidator(2, 16)])
    })

  }

  toggleMode() {
    this.mode = this.mode === 'login' ? 'register' : 'login'
    this.updateForm()
  }
  updateForm() {
    if (this.mode === 'register') {
      this.form.addControl('confirm_password', new FormControl(null, Validators.required))
      this.form.addValidators(PasswordMatchValidator('password', 'confirm_password'))
    } else {
      this.form.removeControl('confirm_password')
      this.form.removeValidators(PasswordMatchValidator('password', 'confirm_password'))
    }
  }

  async onSubmit() {
    // console.log(this.form.value)
    if (this.mode === 'login') {
      this.errorFormServer = await this.accountService.login(this.form.value)
    } else {//register
      this.errorFormServer = await this.accountService.register(this.form.value)
    }

    if (this.errorFormServer === '')
      this.router.navigate(['/'])
  }

  updateErrorMessage(ctrlName: string) {
    const control = this.form.controls[ctrlName]
    if (!control) return

    switch (ctrlName) {
      case 'username':
        // console.log('minLength: ' + control.hasError('minlength'))
        // console.log('maxLength: ' + control.hasError('maxlength'))
        if (control.hasError('required'))
          this.errorMessages.username.set('required')
        else if (control.hasError('minlength'))
          this.errorMessages.username.set('must be at least 6 characters long')
        else if (control.hasError('maxlength'))
          this.errorMessages.username.set('must be 16 characters or fewer')
        else
          this.errorMessages.username.set('')
        // console.log(this.errorMessages.username())
        break

      case 'password':
        if (control.hasError('required'))
          this.errorMessages.password.set('required')
        else if (control.hasError('invalidMinLength'))
          this.errorMessages.password.set('must be at least 8 characters long')
        else if (control.hasError('invalidMaxLength'))
          this.errorMessages.password.set('must be 16 characters or fewer')
        else if (control.hasError('invalidLowerCase'))
          this.errorMessages.password.set('must contain minimum of 1 lower-case letter')
        else if (control.hasError('invalidUpperCase'))
          this.errorMessages.password.set('must contain minimum of 1 capital letter')
        else if (control.hasError('invalidNumeric'))
          this.errorMessages.password.set('must contain minimum of 1 numeric character')
        else if (control.hasError('invalidSpecialChar'))
          this.errorMessages.password.set('must contain minimum of 1 special character')
        else
          this.errorMessages.password.set('')
        break

      case 'confirm_password':
        if (control.hasError('required'))
          this.errorMessages.confirm_password.set('required')
        else if (control.hasError('misMatch'))
          this.errorMessages.confirm_password.set('do not match password')
        else
          this.errorMessages.confirm_password.set('')
        break
    }
  }
}
