import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';
import { User } from '../shared/model/user';
import { tap, take, map } from 'rxjs/operators';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    isAuthenticated: boolean;

    constructor(private authService: AuthService) { }
    ngOnInit(): void {
        //Chk Login status on page refresh
        this.authService.autoLogin();

        this.authService.loggedInUser.subscribe((user: User) => {
            if(user && user.token){
                this.isAuthenticated = true;
            } else {
                this.isAuthenticated = false;
            }
            console.log(this.isAuthenticated);
        });

    }

    onLogout() {
        this.authService.logout();
    }

}