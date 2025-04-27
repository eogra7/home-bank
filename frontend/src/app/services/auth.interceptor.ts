import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authService.user$.pipe(
      mergeMap(user => {
        if (user && user.access_token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${user.access_token}`
            }
          });
        }
        return next.handle(request);
      })
    );
  }
} 