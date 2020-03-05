import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { bookInterface } from './../models/book';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  private bookCollection: AngularFirestoreCollection<bookInterface>;
  private books: Observable<bookInterface[]>;
  private bookDoc: AngularFirestoreDocument<bookInterface>;
  private book: Observable<bookInterface>;

  public selectedBook: bookInterface = {
    id: null
  };

  constructor(private afs: AngularFirestore) { }


  getAllBooks() {
    this.bookCollection = this.afs.collection<bookInterface>('books');

    return this.books = this.bookCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as bookInterface;
          data.id = action.payload.doc.id;
          return data;
        })
      }));
  }

  getOneBook(idBook: string) {
    this.bookDoc = this.afs.doc<bookInterface>(`books/${idBook}`);

    return this.book = this.bookDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as bookInterface;
        data.id = action.payload.id;
        return data;
      }

    })
    )
  }

  addBook(book: bookInterface): void {
    this.bookCollection.add(book);
  }

  updateBook(book: bookInterface): void {
    let idBook = book.id;
    this.bookDoc = this.afs.doc<bookInterface>(`books/${idBook}`);
    this.bookDoc.update(book);
  }

  deleteBook(idBook: string): void {
    this.bookDoc = this.afs.doc<bookInterface>(`books/${idBook}`);
    this.bookDoc.delete();
  }

}
