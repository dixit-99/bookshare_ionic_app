import { Component, OnInit} from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { BookServiceService } from 'src/app/services/book-service.service';
import { Book } from 'src/app/services/Book';

@Component({
  selector: 'app-book-deatils',
  templateUrl: './book-deatils.page.html',
  styleUrls: ['./book-deatils.page.scss'],
})
export class BookDeatilsPage implements OnInit {

  backButtonSubscription;
  book: Book[];

  constructor(
    private platform: Platform,
    private bookService: BookServiceService,
    private loadingController: LoadingController
  ) { 
    console.log("book-details");
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

  ngOnInit() {
    this.presentLoadingWithOptions();
    let bookid = localStorage.getItem("bookid")
    this.bookService.getBook(bookid).subscribe( data => {
        this.book =  data
        console.log(this.book)
      },
      error => { console.log(error) },
      () => { this.loadingController.dismiss() }
    )
  }


  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(5,() => {
      window.history.back();
    });
  }

  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }
}
