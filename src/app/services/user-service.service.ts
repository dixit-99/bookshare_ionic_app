import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { User } from './User';
import { Book } from './Book';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    private http: HttpClient
  ) { }

  addUserUrl = 'https://bookshare-spring.herokuapp.com/addUser';
  // addUserUrl = 'http://localhost:9999/addUser';
  addUser(user: User) : Observable<void> {
    return this.http.post<void>(this.addUserUrl,user);
  }

  loginUrl='https://bookshare-spring.herokuapp.com/login';
  // loginUrl='http://localhost:9999/login';
  login(email: string,password: string) : Observable<number> {
    return this.http.get<number>(this.loginUrl+"/"+ email+"/"+ password);
  }

  profileUrl='https://bookshare-spring.herokuapp.com/profile';
  // profileUrl='http://localhost:9999/profile';
  profile(userId: number) : Observable<User> {
    return this.http.get<User>(this.profileUrl+"/"+ userId);
  }

  editUrl='https://bookshare-spring.herokuapp.com/edit';
  // profileUrl='http://localhost:9999/edit';
  edit(userId: number) : Observable<User> {
    return this.http.get<User>(this.editUrl+"/"+ userId);
  }

  addWishlistUrl='https://bookshare-spring.herokuapp.com/addWishlist';
  // addwishlistUrl='http://localhost:9999/addWishlist';
  addWishlist(userId,bookId) : Observable<number> {
    return this.http.post<number>(this.addWishlistUrl+"/"+ userId+"/"+bookId,null);
  }

  rmWishlistUrl='https://bookshare-spring.herokuapp.com/rmWishlist';
  // rmwishlistUrl='http://localhost:9999/rmWishlist';
  rmWishlist(wishlistId) : Observable<void> {
    return this.http.delete<void>(this.rmWishlistUrl+"/"+wishlistId);
  }

  getWishlistUrl='https://bookshare-spring.herokuapp.com/getWishlist';
  // getwishlistUrl='http://localhost:9999/getWishlist';
  getWishlist(userId) : Observable<Book[]> {
    return this.http.get<Book[]>(this.getWishlistUrl+"/"+userId);
  }
  
}
