import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  standalone: false,
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        if (e.url.includes('signin-callback')) {
          
          this.authService.completeLogin().then(user => {
            console.log("completed login", user);
            this.router.navigate(['/dashboard']);
          });
          
        } else if (e.url.includes('signout-callback')) {
          this.authService.completeLogout();
        }
      });
  }
}
