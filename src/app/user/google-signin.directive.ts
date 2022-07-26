import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Directive({
  selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {
  constructor(private angularFireAuth: AngularFireAuth) {}

  @HostListener('click')
  onClick() {
    this.angularFireAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }
}
