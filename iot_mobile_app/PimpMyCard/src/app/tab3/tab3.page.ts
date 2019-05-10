import * as $ from "jquery";
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../IoT/websocket.service';
import { IonToggle } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  websocketService: any = null;
  picImage: any;
  ShowImage: boolean = false;
  LedStatus : boolean;

  constructor(websocketService: WebsocketService) {
    this.websocketService = websocketService;
  }

  ngOnInit() {


    this.websocketService.socketCam.onmessage = async (msg) => {
      //JSON.parse(msg.data).base64;
      //console.log(msg);
      if (this.ShowImage)
        this.picImage = "data:image/jpeg;base64," + JSON.parse(msg.data).base64;
      else
        this.picImage = "https://media.giphy.com/media/6KjoBKe7u3D4X4NmVG/giphy.gif";
    };

    this.websocketService.socketLed.onmessage = async (msg) => {
      console.log("LED"+msg);
      //this.LedStatus = false;
    };
    
  }

  
  /*
  OpenCloseDoors() {
    $('.door').toggleClass('doorOpen');
  }*/

  OpenCloseDoors() {
    if (this.ShowImage)
      this.ShowImage = false;
    else
      this.ShowImage = true;
  }
}
