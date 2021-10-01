import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSignup: boolean;
  badSignup: boolean;
  badLogin: boolean;

  constructor(private snackBar: MatSnackBar,
    private auth: AuthService, private router: Router,
    private database: AngularFirestore,
    private route: ActivatedRoute) {
    this.isSignup = false;
    this.badSignup = false;
    this.badLogin = false;
  }

  ngOnInit(): void {
  }

  googleLogin() {
    this.auth.googleSignUp()
      .then(async (response) => {
        this.router.navigate([this.urlAfterLogin]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  get urlAfterLogin() { return this.route.snapshot.queryParamMap.get('afterLogin'); }

  facebookLogin() {
    this.auth.facebookLogin().then(async (response) => {

      this.router.navigate([this.urlAfterLogin]);

    })
      .catch((error) => {
        console.log(error);
      });;
  }

  appleLogin() {
    this.auth.appleLogin().then(async (response) => {

      this.router.navigate([this.urlAfterLogin]);

    })
      .catch((error) => {
        console.log(error);
      });;
  }

  get actionUrl() {
    return this.isSignup ? '/login' : '/registrarse';
  }

  get actionText() {
    return this.isSignup ? 'Ya tengo una cuenta' : 'Quiero registrarme'
  }

  showMeggase(message: string) {
    return this.snackBar.open(message, 'ACEPTAR', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

}
