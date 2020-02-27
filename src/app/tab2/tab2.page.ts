import { Component, OnInit} from '@angular/core';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  books: any[];
  backButtonSubscription:any;

  constructor(
    private platform: Platform,
    private nativeStorage: NativeStorage,
    private userService: UserServiceService
  ) {}

  ngOnInit() {
    this.nativeStorage.getItem('userId').then(
      (data) => { this.userService.getWishlist(data.user).subscribe(
                  (data) => {  this.books = data },
                  (error) => { console.log(error) },
                  () => { }
                  )
                },
      (error) => console.log(error)
    )
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
