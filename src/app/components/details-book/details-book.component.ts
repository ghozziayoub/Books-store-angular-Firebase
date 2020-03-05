import { bookInterface } from './../../models/book';
import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { ActivatedRoute , Params } from '@angular/router';

@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.component.html',
  styleUrls: ['./details-book.component.css']
})
export class DetailsBookComponent implements OnInit {

  public book : bookInterface

  constructor(private dataApi: DataApiService,private route : ActivatedRoute) { }

  ngOnInit() {
    const idBook = this.route.snapshot.params['id'];
    this.getDetails(idBook);
   
  }

  getDetails(idBook:string):void{
    this.dataApi.getOneBook(idBook).subscribe(
      book=>{
        this.book = book;
        
      }
    )
  }

}
