import { Component } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  books: any[];
  backButtonSubscription:any;

  constructor(
    private platform: Platform,
    private nativeStorage: NativeStorage,
    private userService: UserServiceService,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: "crescent",
      mode: "ios",
      cssClass: "myspin"
    });
    return await loading.present();
  }

  ionViewWillEnter() {
    this.presentLoadingWithOptions()
    this.nativeStorage.getItem('userId').then(
      (data) => { this.userService.getWishlist(data.user).subscribe(
                  (data) => {  this.books = data },
                  (error) => { console.log(error) },
                  () => {
                    this.loadingController.dismiss()
                   }
                  )
                },
      (error) => console.log(error)
    )
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(4,() => {
      window.history.back();
    });
  }

  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  rmWishlist(wishlistId) {
    this.userService.rmWishlist(wishlistId).subscribe(
      () => {},
      (error) => { console.log(error) },
      () => {this.ionViewWillEnter()}
    )
  }

  bookDetails(bookid){
    localStorage.setItem("bookid",bookid)
    this.router.navigateByUrl("book-deatils");
  }

}
