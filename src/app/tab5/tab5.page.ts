import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit,AfterViewInit,OnDestroy {

  constructor(
    private nativeStorage: NativeStorage,
    private router:Router,
    private platform: Platform
  ) { }

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

  logout(){
    this.nativeStorage.clear();
    this.router.navigateByUrl('login')
  }
}
