import { userInterface } from './../../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './../../../services/auth.service';
import { bookInterface } from './../../../models/book';
import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  private books: bookInterface[];
  public isAdmin: any = null;
  public userUid: string = null;

  constructor(
    private dataApi: DataApiService,
    private authService: AuthService) { }

  ngOnInit() {
    this.getListBooks();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(
      auth => {
        if (auth) {
          this.userUid = auth.uid;
          this.authService.isUserAdmin(this.userUid).subscribe(
            userRole => {
              this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
            })
        }
      })
  }

  getListBooks() {
    this.dataApi.getAllBooks().subscribe(
      books => {
        this.books = books;
      }
    )
  }

  onDelete(idBook: string) {
    const confirmation = confirm('Are You Sure ? ');
    if (confirmation) {
      this.dataApi.deleteBook(idBook);
    }
    //25 344 346
  }

  onPreUpdate(book: bookInterface) {
    this.dataApi.selectedBook = Object.assign({}, book)
  }


}
