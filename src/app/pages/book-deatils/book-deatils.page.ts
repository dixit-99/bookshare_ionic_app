import { Component} from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-book-deatils',
  templateUrl: './book-deatils.page.html',
  styleUrls: ['./book-deatils.page.scss'],
})
export class BookDeatilsPage {

  constructor(
    private platform: Platform
  ) { 
    console.log("book-details");
  }

  backButtonSubscription; 

  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(5,() => {
      window.history.back();
    });
  }

  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }
}
