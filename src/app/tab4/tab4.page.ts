import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit,AfterViewInit,OnDestroy {

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
