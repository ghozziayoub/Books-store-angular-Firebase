import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public app_name :string = "BookStore";
  public isLogged : boolean = false;

  constructor(private authService:AuthService,private afsAuth:AngularFireAuth) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.authService.isAuth().subscribe(
      auth => {
        if (auth) {
          console.log('user logged');
          this.isLogged = true;
        }else{
          console.log('NOT user logged');
          this.isLogged = false; 
        }
      }
    );
  }

  onLogout(){
    this.afsAuth.auth.signOut();
  }

}
