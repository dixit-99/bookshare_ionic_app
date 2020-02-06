import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { Platform, LoadingController } from '@ionic/angular';
import { UserServiceService } from '../services/user-service.service';
import { User } from '../services/User';
import { Observable } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit{

  user: User;
  userid: any;

  constructor(
    private nativeStorage: NativeStorage,
    private router:Router,
    private platform: Platform,
    private userService: UserServiceService,
    private loadingController: LoadingController
  ) { 
  }

  backButtonSubscription;

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: "crescent",
      showBackdrop: false,
      mode: "ios",
      cssClass: "myspin"
    });
    return await loading.present();
  }

  ngOnInit() {
    this.presentLoadingWithOptions();
    this.nativeStorage.getItem('userId').then(
      (data) => { this.userService.profile(data.user).subscribe(
                  (data) => { this.user = data },
                  (error) => { console.log(error) },
                  () => { this.loadingController.dismiss() }
      )
        localStorage.setItem('userId',data.user)
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

  logout(){
    this.nativeStorage.clear();
    this.router.navigateByUrl('/login')
  }

  edit() {
    localStorage.setItem("editMode","true");
    this.router.navigateByUrl('/register');
  }
}
