import { Component, OnInit} from '@angular/core';
import { Platform, ModalController, LoadingController} from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { FilterPage } from '../pages/filter/filter.page';
import { Book } from '../services/Book';
import { BookServiceService } from '../services/book-service.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  books: Book[];

  constructor(
    private router: Router,
    private nativeStorage: NativeStorage,
    private platform: Platform,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private bookService: BookServiceService
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

  ngOnInit(){
    this.presentLoadingWithOptions();
    this.bookService.getAllBook().subscribe( (data) =>  { 
        this.books = data
        console.log(this.books)
      },
      (error) => { console.log(error) },
      () => { this.loadingController.dismiss() }
    );
  }

  backButtonSubscription;

  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(3,() => {
      if(window.confirm("Do you want to exit app ?")) {
        navigator["app"].exitApp();
      }
    });
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
}
