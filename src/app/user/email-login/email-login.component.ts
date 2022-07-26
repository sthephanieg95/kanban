import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent {
  form: FormGroup;
  type: 'login' | 'signup' | 'reset' = 'login';
  loading = false;
  serverMessage: string = '';

  constructor(
    private angularFireAuth: AngularFireAuth,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8), Validators.required]],
      passwordConfirm: ['', []]
    });
  }

  changeFormType(value: 'login' | 'signup' | 'reset') {
    this.type = value;
  }

  get isLogin() {
    return this.type == 'login';
  }

  get isSignup() {
    return this.type == 'signup';
  }

  get isReset() {
    return this.type == 'reset';
  }

  get email() {
    return this.form.get('email') as FormGroup;
  }

  get password() {
    return this.form.get('password') as FormGroup;
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm') as FormGroup;
  }

  get passwordDoesMatch() {
    if (this.type !== 'signup') {
      return true;
    } else {
      return this.password?.value === this.passwordConfirm?.value;
    }
  }

  async onSubmit() {
    this.loading = true;

    const email = this.email.value;
    const password = this.password.value;

    try {
      if (this.isLogin) {
        await this.angularFireAuth.signInWithEmailAndPassword(email, password);
      } else if (this.isSignup) {
        await this.angularFireAuth.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        await this.angularFireAuth.sendPasswordResetEmail(email);
        this.serverMessage = 'Check your email';
      }
    } catch (error) {
      this.serverMessage = String(error);
    }
    this.loading = false;
  }
}
