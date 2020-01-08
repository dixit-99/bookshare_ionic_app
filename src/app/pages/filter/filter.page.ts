import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private router: Router
  ) { }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  filter(form) {

  }

  backButtonSubscription;
  ngAfterViewInit () {
    this.backButtonSubscription = this.platform.backButton.subscribe(async () => { 
        this.router.navigateByUrl("/tabs/tab1");
    });
  }

}
