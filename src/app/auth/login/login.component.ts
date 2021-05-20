import { Component, OnInit } from '@angular/core';
import {Select} from '../../decorators/select.decorator';
import {Observable} from 'rxjs';
import {IAuthUser} from '../../state/app.state';
import {Route, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {emailValidator} from '../../helpers/validators';
import {AuthService} from '../auth.service';

export interface IUserLoginForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Select('user') user$: Observable<IAuthUser>;
  LoginForm = this.fb.group({
    email: ['', Validators.compose([Validators.required, emailValidator])],
    password: ['', [Validators.required]],
    rememberMe: false
  });
  LostPasswordForm = this.fb.group({
    email: ['', Validators.compose([Validators.required, emailValidator])],
  });
  showForgotPassword = false;
  public codeSent = false;
  public loginError: string;

  constructor(
      private router: Router,
      private fb: FormBuilder,
      private authService: AuthService,
  ) { }

  ngOnInit() {
    this.user$.subscribe(async user => {
      if (!user || !user.token) {
        return;
      }

      await this.router.navigate(['/']);

    })
  }

  async login() {
    if (this.LoginForm.invalid) {
      return;
    }

    const details: IUserLoginForm = {
      email: this.LoginForm.value.email,
      password: this.LoginForm.value.password,
      rememberMe: this.LoginForm.value.rememberMe
    };

    const res = await this.authService.login(details.email, details.password);
    if (!res.token && res.reason) {
      this.loginError = res.reason;
      console.log(res.reason)
      return;
    }

    // Hack, for some reason after login the router is not loading the components on the view
    setTimeout(() => location.reload(), 200);
  }

  get email() {
    return this.LoginForm.get('email');
  }

  get lostPasswordEmail() {
    return this.LostPasswordForm.get('email');
  }

  get password() {
    return this.LoginForm.get('password');
  }

  async sendVerificationCode() {
    await this.authService.sendResetPasswordVerificationCode(this.lostPasswordEmail.value);
    this.codeSent = true;

  }

}
