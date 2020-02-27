import { Component, OnInit} from '@angular/core';
import { Platform, ModalController, LoadingController, ActionSheetController, ToastController} from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { FilterPage } from '../pages/filter/filter.page';
import { Book } from '../services/Book';
import { BookServiceService } from '../services/book-service.service';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
 
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  books: any[];
  backButtonSubscription: any;

  constructor(
    private router: Router,
    private nativeStorage: NativeStorage,
    private platform: Platform,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private bookService: BookServiceService,
    private userService: UserServiceService,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController
  ) { 
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: "crescent",
      showBackdrop: false,
      mode: "ios",
      cssClass: "myspin"
    });
    return await loading.present();
  }

  async sort() {
    const actionSheet = await this.actionSheetController.create({
      header: "Sort",
      buttons: [{
        text: 'Price : Low To High',
        handler: () => {
          this.books.sort(function(a,b) {
            return a.sellingprice - b.sellingprice;
          })
        },
      },
      {
        text: 'Price : High To Low',
        handler: () => {
          this.books.sort(function(a,b) {
            return b.sellingprice - a.sellingprice;
          })
        },
      }]
    });
    await actionSheet.present();
  }

  ngOnInit(){
    this.presentLoadingWithOptions();
    if(sessionStorage.getItem("filter")!='true') {
      this.bookService.getAllBook().subscribe( (data) =>  { 
          this.books = data
          this.books.forEach(book => {
            book.add = true;
          });
          console.log(this.books)
        },
        (error) => { console.log(error) },
        () => { this.loadingController.dismiss() }
      );
    }
  }

  ionViewWillEnter() {
    if(sessionStorage.getItem('filter')=='true'){
      this.presentLoadingWithOptions();
      sessionStorage.removeItem("filter")
      let semester = sessionStorage.getItem("semester")
      let branchId = sessionStorage.getItem("branchId")
      let subjectId = sessionStorage.getItem("subjectId")
      let college = sessionStorage.getItem("college")
      this.bookService.filter(semester,branchId,subjectId,college).subscribe(
        data =>  { 
          this.books = data
          this.books.forEach(book => {
            book.add = true;
          });
          console.log(this.books)
        },
        (error) => { console.log(error) },
        () => { this.loadingController.dismiss() }
      )

      this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(3,() => {
        this.bookService.getAllBook().subscribe( (data) =>  { 
            this.books = data
            this.books.forEach(book => {
              book.add = true;
            });
            console.log(this.books)
            this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(3,() => {
              if(window.confirm("Do you want to exit app ?")) {
                navigator["app"].exitApp();
              }
            });
          },
          (error) => { console.log(error) },
          () => { this.loadingController.dismiss() }
        );
      });
    }
    else {
      this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(3,() => {
        if(window.confirm("Do you want to exit app ?")) {
          navigator["app"].exitApp();
        }
      });
    }
  }

  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }
  
  public bookDetails(bookid){
    localStorage.setItem("bookid",bookid)
    this.router.navigateByUrl("book-deatils");
  }

  async createModal() {
    const modal = await this.modalController.create({
      component: FilterPage
    });
    return await modal.present();
  }

  addWishlist(i,bookid) {
    this.books[i].add = false;
    this.nativeStorage.getItem('userId').then(
      (data) => { this.userService.addWishlist(data.user,bookid).subscribe(
                  (data) => {  this.books[i].wishlistId = data },
                  (error) => { console.log(error) }
                  )
                },
      (error) => console.log(error)
    )
  }

  rmWishlist(i,wishlistId) {
    this.books[i].add = true;
    this.userService.rmWishlist(this.books[i].wishlistId).subscribe(
      () => {},
      (error) => { console.log(error) },
      () => {}
    )
  }

  refresh() {
    this.presentLoadingWithOptions();
    this.bookService.getAllBook().subscribe( (data) =>  { 
      this.books = data
      this.books.forEach(book => {
        book.add = true;
      });
      },
      (error) => { console.log(error) },
      () => { this.loadingController.dismiss() }
    );
  }
}
