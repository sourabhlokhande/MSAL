import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Books } from '../model/book.model';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  book : Books = 
  {
    title : '',
    genre : '',
    author: '',
    price : 0, 
  }

  books : Books[] = [];

  addBookForm : boolean= false;
  isUserLoggedIn():boolean
 {
   if(this.msalService.instance.getActiveAccount()!=null)
   {
     return true;
   }
   return false;
 }

  constructor(private bookService : BookService,private msalService:MsalService) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  showAddBook(): void{
    this.addBookForm = true;
 }


  getAllBooks()
  {
    this.bookService.getAllBooks()
    .subscribe(
      response => { 
        this.books = response;
      }); 
  }

  saved_btn : boolean = false;

  onSubmit()
  { 
    this.saved_btn = true;
    this.bookService.addBook(this.book).subscribe();

    setTimeout(()=>{
      this.getAllBooks();
      this.saved_btn = false;
    },500)
  }

  deleteBook(book : Books)
  {
    confirm("Are you Sure?")
    this.bookService.deleteBook(book);
    setTimeout(()=>{
      this.getAllBooks();
    },500)
  }

}
