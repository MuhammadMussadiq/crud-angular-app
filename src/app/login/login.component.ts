import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @ViewChild("form") form: NgForm;
  failureMsg: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

  }


  authenticate() {

    console.log(this.form.value);
    this.failureMsg = '';

    this.authService.login(this.form.value.username, this.form.value.password)
      .subscribe((response) => {
        console.log("Login Successfull")
        this.router.navigate(['/list']);

      }, (error) => {
        console.log(error);
        this.failureMsg = "You are not authenticated!"
      });
  }

  logout() {
    localStorage.removeItem("loggedInUser");
    this.router.navigate(['/login']);
}

}

