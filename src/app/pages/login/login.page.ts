import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { from } from 'rxjs';
import { NavController, ToastController, Platform } from '@ionic/angular';
import { async } from 'rxjs/internal/scheduler/async';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit,AfterViewInit,OnDestroy {

  status=false;

  constructor(
    private navController: NavController,
    private toastController: ToastController,
    private nativeStorage: NativeStorage,
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


  login(form) {
    if(form.value.email == "link" && form.value.password == 1234){
      this.navController.navigateRoot('tabs/tab1');
      // this.nativeStorage.setItem('user',form.value.email);
      // this.nativeStorage.getItem('user');
      
      this.nativeStorage.setItem('my', form.value.email);
    }
    else{
      this.status = true;
    }
  }

}
