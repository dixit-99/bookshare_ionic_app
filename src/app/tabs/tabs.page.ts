import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  tab: boolean[] = [true,false,false,false,false]

  constructor() {}

  fun(index) {
    this.tab[index] = true
    for(var i=0; i<5; i++) {
      if(i==index)
        continue;
      else
        this.tab[i] = false
    }
  }

}
