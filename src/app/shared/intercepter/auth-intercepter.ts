import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, exhaustMap, tap } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Injectable()
export class AuthIntercepter implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.authService.getLoggedInUser();

            if (user) {
                req = req.clone({
                    headers: req.headers.append('Authorization', user.token)
                });
            
            }
           

            return handler.handle(req).pipe( tap(() => {},
            (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.router.navigate(['login']);
              } else if (err.status === 403) {
                alert("You are not authorized to do this action");
              }
              return;
              
            }
          }));;

    }


}