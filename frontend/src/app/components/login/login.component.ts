import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  login() {
    this.authService.login();
  }
} 