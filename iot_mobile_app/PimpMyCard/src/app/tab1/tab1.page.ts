import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../IoT/websocket.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  temp: any = 0;
  humi: any = 0;
  acce: any = 0;
  speed: any = 0;
  websocketService : any = null;
  initialDelay : number;
  period : number;

  constructor(websocketService : WebsocketService) {
    this.websocketService = websocketService;
  }

  ngOnInit() {
    this.websocketService.socketTemp.onmessage = async (msg) => {
      console.log("json : ",JSON.parse(msg.data).temp);
      this.temp = parseFloat(JSON.parse(msg.data).temp) + "°";
    };
    this.websocketService.socketHum.onmessage = async (msg) => {
      console.log("json : ",JSON.parse(msg.data));
      this.humi = JSON.parse(msg.data).hum + "%";
    };
    this.websocketService.socketAcc.onmessage = async (msg) => {
     // console.log("json : ",JSON.parse(msg.data));
      this.acce = JSON.parse(msg.data).acc;
    };
    
  }
}