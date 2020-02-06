import { Component} from '@angular/core';
import { NavController, Platform, ModalController} from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { FilterPage } from '../pages/filter/filter.page';
 
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private navController: NavController,
    private nativeStorage: NativeStorage,
    private platform: Platform,
    private modalController: ModalController,
  ) { 
    console.log("tab1");
  }

  backButtonSubscription;

  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(3,() => {
      if(window.confirm("Do you want to exit app ?")) {
        navigator["app"].exitApp();
      }
    });
  }

  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }
  
  public bookDetails(){
    this.navController.navigateRoot("book-deatils");
  }

  async createModal() {
    const modal = await this.modalController.create({
      component: FilterPage
    });
    return await modal.present();
  }
}
