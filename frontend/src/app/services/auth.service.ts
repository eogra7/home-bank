import { Injectable } from '@angular/core';
import { UserManager, User } from 'oidc-client';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userManager: UserManager;
  private _user$ = new BehaviorSubject<User | null>(null)
  user$ = this._user$.asObservable()
  constructor() {
    const settings = {
      authority: 'https://localhost:5001',
      client_id: 'angular-client',
      redirect_uri: 'http://localhost:4200/signin-callback',
      post_logout_redirect_uri: 'http://localhost:4200/signout-callback',
      response_type: 'code',
      scope: 'openid profile email users.api accounts.api',
      automaticSilentRenew: true,
      loadUserInfo: true
    };
    this.userManager = new UserManager(settings);
    this.userManager.getUser().then(user => {
        this._user$.next(user)
    });
  }

  login() {
    return this.userManager.signinRedirect();
  }

  logout() {
    return this.userManager.signoutRedirect();
  }

//   isLoggedIn(): boolean {
//     return this.user != null && !this.user.expired;
//   }

//   getAccessToken(): string {
//     return this.user?.access_token || '';
//   }

  completeLogin() {
    return this.userManager.signinRedirectCallback().then(user => {
      this._user$.next(user);
      return user;
    });
  }

  completeLogout() {
    this._user$.next(null);
    return this.userManager.signoutRedirectCallback();
  }
} 