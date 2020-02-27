import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './Book';
import { Observable } from 'rxjs';
import { Subject } from './Subject';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  constructor(
    private http: HttpClient
  ) { }

  addBookUrl = 'https://bookshare-spring.herokuapp.com/addBook';
  //addBookUrl = 'http://localhost:9999/addBook';
  addBook(book: Book) : Observable<void> {
    return this.http.post<void>(this.addBookUrl,book);
  }

  getAllBookUrl = 'https://bookshare-spring.herokuapp.com/getAllBooks';
  // getAllBookUrl = 'http://localhost:9999/getAllBooks';
  getAllBook() : Observable<Book[]> {
    return this.http.get<Book[]>(this.getAllBookUrl);
  }

  getBookUrl = 'https://bookshare-spring.herokuapp.com/getBook';
  // getBookUrl = 'http://localhost:9999/getBook';
  getBook(bookId): Observable<Book[]> {
    return this.http.get<Book[]>(this.getBookUrl+"/"+bookId);
  }

  subjectUrl = 'https://bookshare-spring.herokuapp.com/subject';
  // subjectUrl = 'http://localhost:9999/subject';
  subject(semester:any, branchId:any): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.subjectUrl+"/"+semester+"/"+branchId);
  }

  filterUrl = 'https://bookshare-spring.herokuapp.com/filter';
  // filterUrl = 'http://localhost:9999/subject';
  filter(semester:any, branchId:any, subjectId:any): Observable<Book[]> {
    return this.http.get<Book[]>(this.filterUrl+"/"+semester+"/"+branchId+"/"+subjectId);
  }

}
