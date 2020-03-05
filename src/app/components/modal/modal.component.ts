import { NgForm } from '@angular/forms';
import { bookInterface } from './../../models/book';
import { DataApiService } from './../../services/data-api.service';
import { Component, OnInit ,ViewChild ,ElementRef, Input } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @ViewChild('btnClose') btnClose : ElementRef;
  @Input() userUid : string;

  constructor(private dataApi: DataApiService) { }

  ngOnInit() {
  }

  onSaveBook(bookForm: NgForm): void {
    const idBook = bookForm.value.id;
    if (!idBook) {
      //new
      bookForm.value.userUid = this.userUid;
      this.dataApi.addBook(bookForm.value);
    }else{
      //update
      this.dataApi.updateBook(bookForm.value)
    }

    bookForm.resetForm();
    this.btnClose.nativeElement.click();
    
  }

}
