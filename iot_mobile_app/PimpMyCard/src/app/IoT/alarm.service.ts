import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  ledState : any = null;
  speed : any = null;
  isAlertActivated : boolean = false;
  constructor() { }

  setAlert(){
    if(this.isAlertActivated){
      this.isAlertActivated = false;
    }else{
      this.isAlertActivated = true;
    }
  }
}
