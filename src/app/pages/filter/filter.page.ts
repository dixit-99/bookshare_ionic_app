import { Component} from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage {

  backButtonSubscription;

  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private router: Router
  ) { }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  filter(form) {

  }

  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(4,() => {
      window.history.back();
    });
  }

  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

}
