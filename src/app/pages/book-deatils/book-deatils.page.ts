import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-book-deatils',
  templateUrl: './book-deatils.page.html',
  styleUrls: ['./book-deatils.page.scss'],
})
export class BookDeatilsPage implements OnInit,AfterViewInit,OnDestroy {

  constructor(
    private platform: Platform
  ) { 
    console.log("book-details");
  }

  backButtonSubscription; 

  ngOnInit() {
  }

  ngAfterViewInit () {
    this.backButtonSubscription = this.platform.backButton.subscribe(async () => { 
      window.history.back();
      });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
}
