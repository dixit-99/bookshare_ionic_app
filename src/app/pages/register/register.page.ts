import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit,AfterViewInit,OnDestroy {

  constructor(
    private router: Router,
    private platform: Platform
  ) { }

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

  register(form) {
    this.router.navigateByUrl('tabs/tab1');
  }

}
