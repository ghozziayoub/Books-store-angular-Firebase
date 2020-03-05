import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }

  public email: string = "";
  public pass: string = "";
  ngOnInit() {
  }

  onLogin(): void {
    this.authService.loginEmailUser(this.email, this.pass)
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => console.log('err', err.message))
  }

  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => console.log('err', err.message))
  }

  onLoginFacebook(): void {
    this.authService.loginFacebookUser()
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => console.log('err', err.message))
  }


  onLoginRedirect(): void {
    this.router.navigate(['admin/list-books']);
  }

}
