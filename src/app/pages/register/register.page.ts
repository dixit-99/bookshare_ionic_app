import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from 'src/app/services/User';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userForm : FormGroup;
  user : User;
  college : any[] = ['LD','VGEC','LJ','SO','DAIICT' ];
  backButtonSubscription: any;
  password_type: string = 'password';
  password_icon: string = 'eye-off';
  status:boolean = false;
  mode:string = "create";

  constructor(
    private router: Router,
    private platform: Platform,
    private formBuilder: FormBuilder,
    private userService: UserServiceService,
    private nativeStorage:  NativeStorage
  ) { 
    this.userForm = formBuilder.group({
      userId: [''],
      firstName : ['',[Validators.required,Validators.maxLength(20)]],
      lastName : ['',[Validators.required,Validators.maxLength(20)]],
      password : ['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      confirmPassword : ['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      wpno : ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      email : ['',[Validators.required,Validators.email,Validators.maxLength(30)]],
      userType : ['',[Validators.required]],
      college : ['',[Validators.required]],
    })
  }

  ngOnInit() {
    if(localStorage.getItem('editMode') == "true") {
      this.userService.edit(parseInt(localStorage.getItem('userId'))).subscribe(u => {
        this.userForm.patchValue({
          userId: u.userId,
          firstName: u.firstName,
          lastName: u.lastName,
          wpno: u.wpno,
          email: u.email,
          password: u.password,
          college: u.college,
          userType: u.userType
        })
      }
      );
      localStorage.removeItem('editMode');
      this.mode = "update"
    }
  }

  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(20,() => {
      window.history.back();
    })
  }

  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  togglePasswordMode() {   
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
    this.password_icon = this.password_icon === 'eye' ? 'eye-off' : 'eye';
  }

  reset() {
    this.userForm.reset();
  }

  register(userForm) {
      if(this.userForm.value.password == this.userForm.value.confirmPassword){
        this.status = false;
        this.user = this.userForm.value;
        this.userService.addUser(this.user).subscribe(() => console.log(""));
        this.userService.login(this.userForm.value.email,this.userForm.value.password).subscribe( userId => this.nativeStorage.setItem('userId',{user: userId}));
        this.router.navigateByUrl("tabs/tab1");
      }
      else{
        this.status = true;
      }
  }

}
