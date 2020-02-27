import { Component} from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { BookServiceService } from 'src/app/services/book-service.service';
import { Subject } from 'src/app/services/Subject';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage {

  backButtonSubscription;
  sem:any;
  branchVar:any;
  sub:any;
  subjects: Subject[];
  invalid:any = true;

  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private router: Router,
    private bookService: BookServiceService
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

  semester(){
    if(/^[0-9]$/.test(this.sem) && /^[0-9]{1,2}$/.test(this.branchVar)){
      this.bookService.subject(this.sem,this.branchVar).subscribe(
        data => { this.subjects = data 
            this.sub=""
        }
      )
    }
    else{
      this.invalid = true
      this.sub=""
    }
  }

  branch() {
    if(/^[0-9]$/.test(this.sem) && /^[0-9]{1,2}$/.test(this.branchVar)){
      this.bookService.subject(this.sem,this.branchVar).subscribe(
        data => { this.subjects = data 
          this.sub=""
        }
      )
    }
    else{
      this.invalid = true
      this.sub=""
    }
  }

  subject() {
    if(/^[0-9]$/.test(this.sem) && /^[0-9]{1,2}$/.test(this.branchVar) && /^[0-9]{4}$/.test(this.sub)){
      this.invalid = false
    }
    else{
      this.invalid = true
    }
  }

  apply() {
    sessionStorage.setItem("semester",this.sem)
    sessionStorage.setItem("branchId",this.branchVar)
    sessionStorage.setItem("subjectId",this.sub)
    sessionStorage.setItem("filter", 'true')
    this.router.navigateByUrl('tabs/tab2').then(e => {
      this.router.navigateByUrl('/tabs/tab1')
    });
    this.modalController.dismiss()
  }
}
