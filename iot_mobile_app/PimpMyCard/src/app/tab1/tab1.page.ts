import { AlarmService } from './../IoT/alarm.service';
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
  pastHumArray = new Array<any>();
  pastAccArray = new Array<any>();
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
  ledState : any;

  constructor(websocketService: WebsocketService, private httpClient: HttpClient,  private iab: InAppBrowser, private alarm : AlarmService) {
    this.websocketService = websocketService;
  }



  ngOnInit() {
    this.websocketService.socketTemp.onmessage = async (msg) => {
      this.addNewTempInArray(JSON.parse(msg.data));
      this.temp = parseFloat(JSON.parse(msg.data).temp);
    };
    this.websocketService.socketHum.onmessage = async (msg) => {
      this.addNewHumInArray(JSON.parse(msg.data));
      this.humi = JSON.parse(msg.data).hum;
    };
    this.websocketService.socketAcc.onmessage = async (msg) => {
      this.acce = JSON.parse(msg.data).acc;
      this.addNewAccInArray(JSON.parse(msg.data));
      this.updateSpeed();
      this.calculateXAngle(this.acce);
    };
    this.websocketService.socketLocalisation.onmessage = async (msg) => {
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
  }

  addNewHumInArray(newHum : any){
    for (let index = 0; index < this.pastHumArray.length; index++) {
      if (index != 9) {
        this.pastHumArray[index] = this.pastHumArray[index + 1];
      } else {
        this.pastHumArray[index] = newHum;
      }
    }
  }

  addNewAccInArray(newAcc : any){
    for (let index = 0; index < this.pastAccArray.length; index++) {
      if (index != 9) {
        this.pastAccArray[index] = this.pastAccArray[index + 1];
      } else {
        this.pastAccArray[index] = newAcc;
      }
    }
  }

  ngAfterViewInit() {
    this.httpClient.get('http://192.168.43.136:1880/temperature', {}).subscribe((data) => {
      for (let index = 0; index <= 9; index++) {
        this.pastTempArray.push(data[index]);
      }
    }, (error) => {
      console.log(error.status);
      console.log(error.error);// error message as string
      console.log(error.headers);
    });
    this.httpClient.get('http://192.168.43.136:1880/humidity', {}).subscribe((data) => {
      for (let index = 0; index <= 9; index++) {
        this.pastHumArray.push(data[index]);
      }
    }, (error) => {
      console.log(error.status);
      console.log(error.error);// error message as string
      console.log(error.headers);
    });
    this.httpClient.get('http://192.168.43.136:1880/acceleration', {}).subscribe((data) => {
      for (let index = 0; index <= 9; index++) {
        this.pastAccArray.push(data[index]);
      }
      this.calculateSpeedWithArray();
    }, (error) => {
      console.log(error.status);
      console.log(error.error);// error message as string
      console.log(error.headers);
    });
  }

  ionViewWillEnter(){
    if(this.alarm.ledState!=null){
      this.ledState = this.alarm.ledState;
      //console.log(this.ledState);
    }
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

  calculateSpeedWithArray(){
    var interval = 1;//1 seconde
    var v0 = 0;
    var vx0 = 0;
    var vy0 = 0;
    var vz0 = 0;
    var vfx = 0;
    var vfy = 0;
    var vfz = 0;
    var vf = 0;
    var gravity = 1000;
    var accXYZ = null;
    if(this.pastAccArray.length === 10){
      for (let index = 0; index < this.pastAccArray.length; index++) {
        accXYZ = this.formatAccData(this.pastAccArray[index].acc);
        vfx = vx0 + (accXYZ[0]/gravity)*interval;
        vfy = vy0 + (accXYZ[0]/gravity)*interval;
        vfz = vz0 + (accXYZ[0]/gravity)*interval;
        vf = v0 + Math.sqrt(Math.pow(vfx,2) + Math.pow(vfy,2) + Math.pow(vfz,2));
        vx0 = vfx;
        vy0 = vfy;
        vz0 = vfz;
        v0 = vf;
      }
      vf=vf*3,6;//convert in km/h
      this.speed = vf.toFixed(2);
      this.alarm.speed = this.speed;
    }
  }

  updateSpeed(){
    var interval = 1;//1 seconde
    var v0 = 0;
    var vx0 = 0;
    var vy0 = 0;
    var vz0 = 0;
    var vfx = 0;
    var vfy = 0;
    var vfz = 0;
    var vf = 0;
    var gravity = 1000;
    var accXYZ = null;
    if(this.pastAccArray.length === 10){
      for (let index = 8; index < this.pastAccArray.length; index++) {
        accXYZ = this.formatAccData(this.pastAccArray[index].acc);
        vfx = vx0 + (accXYZ[0]/gravity)*interval;
        vfy = vy0 + (accXYZ[0]/gravity)*interval;
        vfz = vz0 + (accXYZ[0]/gravity)*interval;
        vf = v0 + Math.sqrt(Math.pow(vfx,2) + Math.pow(vfy,2) + Math.pow(vfz,2));
        vx0 = vfx;
        vy0 = vfy;
        vz0 = vfz;
        v0 = vf;
      }
      vf=vf*3,6;//convert in km/h
      this.speed = vf.toFixed(2);
      this.alarm.speed = this.speed;
      console.log('vitesse avant test :',this.alarm.speed);
      if(this.alarm.speed > 15 && this.ledState === 1){
        this.alarm.isAlertActivated = true;
        console.log('alert active :',this.alarm.isAlertActivated);
      }
    }
  }

  OpenMaps() {
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    const browser = this.iab.create('https://www.google.com/maps/search/?api=1&query='+this.latitude +","+this.longitude ,'_self', options);
  }

  closeAlert(){
    this.alarm.isAlertActivated = false;
  }
}