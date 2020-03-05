import { Component, OnInit ,ElementRef,ViewChild, Input} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private storage: AngularFireStorage) { }

  @ViewChild('imageUser') inputImageUser : ElementRef;

  public email: string = "";
  public pass: string = "";

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;


  ngOnInit() {
  }

  onUpload(event) {
    //console.log(event.target.files[0]);
    const id = Math.random().toString(36).substr(2);
    const file = event.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe()
  }

  onRegister() {

    this.authService.registerUser(this.email, this.pass)
      .then((res) => {
        this.authService.isAuth().subscribe(user => {
          if (user) {
            console.log(user);
            
            user.updateProfile({
              displayName: 'Pepito',
              photoURL: this.inputImageUser.nativeElement.value
            }).then(() => {
              console.log("user updated !");
              this.onRegisterRedirect();

            }).catch((e) => {
              console.log("erreur : " + e);
            })
          }
        })
        
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

  onRegisterRedirect() {
    this.router.navigate(['admin/list-books']);
  }

}
