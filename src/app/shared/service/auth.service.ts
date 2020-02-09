import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpClient: HttpClient, private router: Router) { }

    loggedInUser = new BehaviorSubject<User>(null);

    login(username: string, password: string): Observable<any> {
        return this.httpClient
            .post(environment.baseUrl + "/authenticate",
                {
                    username: username,
                    password: password
                }).pipe(tap((response) => {
                    this.handleAuthentication(response, username);
                }));
    }
    handleAuthentication(response: any, username: string) {
        const token = response.tokenType + " " + response.accessToken; //e.g Bearer 7348573425
        const user = new User(username, token);
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        this.loggedInUser.next(user);
    }

    getLoggedInUser(): User {
        const user: User = JSON.parse(localStorage.getItem("loggedInUser"));
        return user;
    }


    logout() {
        localStorage.removeItem("loggedInUser");
        this.loggedInUser.next(null);
        this.router.navigate(['/login']);
    }

    autoLogin() {
        const user: User = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!user) {
            return;
        }
        if (user && user.token) {
            this.loggedInUser.next(user);
        }

    }

}