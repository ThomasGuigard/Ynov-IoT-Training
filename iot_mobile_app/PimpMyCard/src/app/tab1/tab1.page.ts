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
  acce: any = "[100,200,300]";
  speed: any = 0;
  angleX: any = 0;
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
      this.acce = JSON.parse(msg.data).acc;
      this.calculateXAngle(this.acce);
    };
    this.calculateXAngle(this.acce);
  }

  calculateXAngle(accxyz){
    var accxyzArray = this.formatAccData(accxyz);
    console.log(accxyzArray);
    console.log("x :", accxyzArray[0])
    console.log("y :",accxyzArray[1]);
    console.log("z :",accxyzArray[2]);
    console.log("y² :",Math.pow(accxyzArray[1],2));
    console.log("z² :",Math.pow(accxyzArray[2],2));
    console.log('downOperant :',Math.sqrt(Math.pow(accxyzArray[1],2) + Math.pow(accxyzArray[2],2)));
    let downOperant : number = Math.sqrt(Math.pow(accxyzArray[1],2) + Math.pow(accxyzArray[2],2));
    console.log(downOperant);
    var xAngle = Math.atan(accxyzArray[0]/downOperant);
    xAngle = (xAngle*180)/Math.PI
    this.angleX = xAngle;
  }

  formatAccData(accxyz){
    var accxyzArray = accxyz.split(',');
    for (let index = 0; index < accxyzArray.length; index++) {
      accxyzArray[index] = accxyzArray[index].replace('[','').replace(']','');
    }
    return accxyzArray;
  }
}