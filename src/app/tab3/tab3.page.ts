import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit,AfterViewInit,OnDestroy {

  constructor(
    private platform: Platform
  ) {}

  backButtonSubscription;
  
  ngOnInit() {
  }

  ngAfterViewInit () {
    this.backButtonSubscription = this.platform.backButton.subscribe(async () => { 
      navigator['app'].exitApp();
      });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

}
