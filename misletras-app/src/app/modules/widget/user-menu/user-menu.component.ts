import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  isLoggedIn: boolean = false;
  constructor(private auth: AuthService, private router: Router) {
    this.auth.firebaseAuth.authState.subscribe(state => this.isLoggedIn = state != null);
  }

  ngOnInit(): void {
  }

  get hasPhoto(): boolean { return this.auth.user?.photoURL != null; }

  get photo() { return this.auth.user?.photoURL; }

  async onLogout() {
    await this.auth.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
