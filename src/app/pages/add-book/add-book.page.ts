import { Component} from '@angular/core';
import { ToastController, LoadingController, ActionSheetController, Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Book } from 'src/app/services/Book';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Camera, PictureSourceType, CameraOptions } from '@ionic-native/Camera/ngx';
import { User } from 'src/app/services/User';
import { UserServiceService } from 'src/app/services/user-service.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.page.html',
  styleUrls: ['./add-book.page.scss'],
})
export class AddBookPage {

  bookForm: FormGroup;
  book: Book = new Book();
  user: User = new User();
  error: any;
  backButtonSubscription: any;
  front:any = "assets/img/front.jpg";
  back:any = "assets/img/back.jpg";

  imgf: any;
  imgb: any;

  flink: any = {
    'data' : {
        'deletehash' : '',
        'link' : ''
    }
  };

  blink: any = {
    'data' : {
        'deletehash' : '',
        'link' : ''
    }
  };

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private actionSheetController: ActionSheetController,
    private platform: Platform,
    private formBuilder: FormBuilder,
    private camera: Camera,
    private webview: WebView,
    private userService: UserServiceService,
    private nativeStorage: NativeStorage,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController

  ) {
    this.bookForm = formBuilder.group({
      bookId : [''],
      bookName : ['',[Validators.required,Validators.maxLength(20)]],
      branchName : ['',[Validators.required,Validators.maxLength(50)]],
      semester: ['',[Validators.required,Validators.maxLength(1)]],
      subjectName: ['',[Validators.required,Validators.maxLength(10)]],
      subjectCode: ['',[Validators.required,Validators.maxLength(7)]],
      author : ['',[Validators.required,Validators.maxLength(30)]],
      publication : ['',[Validators.required,Validators.maxLength(30)]],
      edition : ['',[Validators.required,Validators.maxLength(3)]],
      publishedYear : ['',[Validators.required,Validators.maxLength(4)]],
      page : ['',[Validators.required,Validators.maxLength(4)]],
      bookCondition : ['',[Validators.required,Validators.maxLength(10)]],
      originalPrice : ['',[Validators.required,Validators.maxLength(4)]],
      sellingPrice : ['',[Validators.required]]
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'New Book Added Sucessfully',
      duration: 2500
    });
    toast.present();
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      message: 'Uploading...',
      spinner: "crescent",
      mode: "ios"
    });
    return await loading.present();
  }

  async presentActionSheet(mode: any) {
    const actionSheet = await this.actionSheetController.create({
      header: mode,
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.takePhoto(mode)
        },
      },
      {
        text: 'Gallery',
        icon: 'image',
        handler: () => {
          this.selectPhoto(mode)
        },
      },
      {
        text: 'Okay',
        icon: 'checkmark-circle',
        role: 'okay',
        handler: () => {
          console.log('Okay clicked');
       },  
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  takePhoto(mode: any) {
    const camera: any = navigator['camera'];
    camera.getPicture(imageData => {
      if(mode == 'Front Side'){
        this.imgf = imageData
        this.front = this.webview.convertFileSrc(imageData);
      }
      else {
        this.imgb = imageData
        this.back = this.webview.convertFileSrc(imageData);
      }
    }, error => this.error = JSON.stringify(error), {
      quality: 50,
      destinationType: camera.DestinationType.FILE_URI,
      sourceType: camera.PictureSourceType.CAMERA,
      encodingType: camera.EncodingType.JPEG
    });
  }

  selectPhoto(mode: any){
    const camera: any = navigator['camera'];
    camera.getPicture(imageData => {
      if(mode == 'Front Side'){
        this.imgf = imageData
        this.front = this.webview.convertFileSrc(imageData);
      }
      else {
        this.imgb = imageData
        this.back = this.webview.convertFileSrc(imageData);
      }
    }, error => this.error = JSON.stringify(error), {
      sourceType: camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: camera.DestinationType.FILE_URI,
      quality: 50,
      encodingType: camera.EncodingType.JPEG,
    });
      this.presentActionSheet(mode);
      this.actionSheetController.dismiss();
  }

  uploadPhoto(imageFileUri: any, mode: any) {
    window['resolveLocalFileSystemURL'](imageFileUri,
      entry => {
        entry['file'](file => this.readFile(file, mode));
      });
  }

  readFile(file: any, mode: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {type: file.type});
      formData.append('image', imgBlob, file.name);
      this.postData(formData, mode);
    };
    reader.readAsArrayBuffer(file);
  }

  postData(formData: FormData,mode: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Client-ID 94e477c6643763a'
      })
    };
    this.http.post(`https://api.imgur.com/3/image`, formData, httpOptions).subscribe(response => {
        if(mode == 'front')
          this.flink =  response
        else
          this.blink = response
      },
      (error) => console.log(error),
      () => {
        if(mode == 'front')
          this.uploadPhoto(this.imgb, 'back')
        else
          this.addBook()
      }
    );
  }

  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(5,() => {
      window.history.back();
    });
  }

  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  addBook() {
      this.book = this.bookForm.value
      this.book.discount = ( ( (this.book.originalPrice - this.book.sellingPrice) * 100) / this.book.originalPrice ).toString().substring(0,2)

      this.book.user = this.user
      this.book.imageLinkFront = this.flink.data.link
      this.book.deleteFront = this.flink.data.deletehash
      this.book.imageLinkBack = this.blink.data.link
      this.book.deleteBack = this.blink.data.deletehash
      console.log(this.book)
      this.userService.addBook(this.book).subscribe(
        () => console.log("New Book Added"),
        (error) => console.log(error),
        () => { this.loadingController.dismiss()
                this.presentToast()
                this.router.navigateByUrl('tabs/tab4')
        }
      );
  }

  upload(){
    this.nativeStorage.getItem('userId').then(
      (data) => { localStorage.setItem('userId',data.user) },
      (error) => console.log(error)
    )
    this.user.userId = parseInt(localStorage.getItem('userId'))

    this.presentLoadingWithOptions();
    this.uploadPhoto(this.imgf, 'front')
  }

  reset() {
    this.bookForm.reset();
  }

}
