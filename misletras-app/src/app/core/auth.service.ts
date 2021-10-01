import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user?: firebase.User | null;
  
  constructor(public firebaseAuth: AngularFireAuth) {
    firebaseAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  googleSignUp() {
    return this.firebaseAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  facebookLogin() {
    return this.firebaseAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  appleLogin() {
    return this.firebaseAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  logout() {
    return this.firebaseAuth.signOut();
  }
}
