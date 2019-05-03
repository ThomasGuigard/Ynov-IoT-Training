import { Component } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {


   OpenCloseDoors(){
    $('.door').toggleClass('doorOpen');
   }

}
