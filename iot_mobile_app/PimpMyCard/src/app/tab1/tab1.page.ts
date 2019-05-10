import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../IoT/websocket.service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  temp: any = 0;
  pastTempArray = new Array<any>();
  humi: any = 0;
  acce: any = "[100,200,300]";
  speed: any = 0;
  angleX: any = 0;
  websocketService: any = null;
  initialDelay: number;
  period: number;
  Localisation: any;
  latitude: any;
  longitude: any;

  constructor(websocketService: WebsocketService, private httpClient: HttpClient,  private iab: InAppBrowser) {
    this.websocketService = websocketService;
    //this.b64toBlob();
  }



  ngOnInit() {
    this.websocketService.socketTemp.onmessage = async (msg) => {
      //console.log("json : ", JSON.parse(msg.data));
      this.addNewTempInArray(JSON.parse(msg.data));
      this.temp = parseFloat(JSON.parse(msg.data).temp);
    };
    this.websocketService.socketHum.onmessage = async (msg) => {
      //console.log("json : ", JSON.parse(msg.data));
      this.humi = JSON.parse(msg.data).hum;
    };
    this.websocketService.socketAcc.onmessage = async (msg) => {
      this.acce = JSON.parse(msg.data).acc;
      this.calculateXAngle(this.acce);
    };
    this.websocketService.socketLocalisation.onmessage = async (msg) => {
      console.log("json : ", JSON.parse(msg.data));
      this.longitude = JSON.parse(msg.data).longitude;
      this.latitude = JSON.parse(msg.data).latitude;
      this.Localisation =  this.latitude + " , " +  this.longitude;
    };
  }

  addNewTempInArray(newTemp: any) {
    for (let index = 0; index < this.pastTempArray.length; index++) {
      if (index != 9) {
        this.pastTempArray[index] = this.pastTempArray[index + 1];
      } else {
        this.pastTempArray[index] = newTemp;
      }
    }
    // console.log("array après: ", this.pastTempArray);
  }

  ngAfterViewInit() {
    console.log(this.httpClient);
    this.httpClient.get('http://192.168.43.136:1880/temperature', {}).subscribe((data) => {
      for (let index = 0; index <= 9; index++) {
        this.pastTempArray.push(data[index]);
      }
      console.log(this.pastTempArray);
    }, (error) => {
      console.log(error.status);
      console.log(error.error);// error message as string
      console.log(error.headers);
    });
  }

  calculateXAngle(accxyz) {
    var accxyzArray = this.formatAccData(accxyz);
    let downOperant: number = Math.sqrt(Math.pow(accxyzArray[1], 2) + Math.pow(accxyzArray[2], 2));
    var xAngle = Math.atan(accxyzArray[0] / downOperant);
    xAngle = (xAngle * 180) / Math.PI;
    this.angleX = xAngle.toFixed(2);
  }

  formatAccData(accxyz) {
    var accxyzArray = accxyz.split(',');
    for (let index = 0; index < accxyzArray.length; index++) {
      accxyzArray[index] = accxyzArray[index].replace('[', '').replace(']', '');
    }
    return accxyzArray;
  }

  OpenMaps() {
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    const browser = this.iab.create('https://www.google.com/maps/search/?api=1&query='+this.latitude +","+this.longitude ,'_self', options);
  }
}