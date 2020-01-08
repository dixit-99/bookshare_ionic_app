import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit,AfterViewInit,OnDestroy {

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
