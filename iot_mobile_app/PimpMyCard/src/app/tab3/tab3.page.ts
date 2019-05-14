import { AlarmService } from './../IoT/alarm.service';
import { HttpClient } from '@angular/common/http';
import * as $ from "jquery";
import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from '../IoT/websocket.service';
import { IonToggle, AlertController, ModalController, IonSlide, IonSlides } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NullTemplateVisitor } from '@angular/compiler';
import { Tab1Page } from '../tab1/tab1.page';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  websocketService: any = null;
  picImage: any;
  showImage: boolean = false;
  ledStatus: boolean;
  ledButton : any;
  isAlarmButtonDisabled : boolean = true;
  isDoorButtonDisabled : boolean = true;
  speed : any = null;
  doorState : any = null;
  LedStatutToDisableToggle: number;
  DateDebut: Date;
  HeureDebut: Date;
  HeureFin: Date;
  DateFin: Date;
  Slide: IonSlides;
  showhideslides: boolean = false;
  items: any;
  LiveButton: boolean = false;
  @ViewChild('alarmButton') alarmButton: IonToggle;

  constructor(websocketService: WebsocketService, private localNotifications : LocalNotifications, private alarm : AlarmService, private httpClient: HttpClient, public modalctrl: ModalController) {
    this.websocketService = websocketService;
  }

  ngOnInit() {

    this.httpClient.get('http://192.168.43.136:1880/getDoorsState', {}).subscribe((data : any) => {
      if(data.payload.status === 0){
        this.doorState = false;
        //console.log("doorState : ",this.doorState);
      }else{
        this.doorState = true;
        //console.log("doorState : ",this.doorState);
      }
      this.isDoorButtonDisabled = false;
      //console.log(this.pastTempArray);
    }, (error) => {
      console.log(error.status);
      console.log(error.error);// error message as string
      console.log(error.headers);
    });

    this.websocketService.socketCam.onmessage = async (msg) => {
      if (this.LiveButton)
        this.picImage = "data:image/jpeg;base64," + JSON.parse(msg.data).base64;

    };

    this.websocketService.socketLed.onmessage = async (msg) => {
      var formatedMsg = msg.data.replace(/"{/g, '{').replace(/}"/g, '}').replace(/\\"/g, '"');
      var data = JSON.parse(formatedMsg);
      $('.led-status').hide();
      $('.btn-switch').removeClass("disabled");
      this.websocketService.ledStatus = parseInt(data.led.characteristics["0c366e80cf3a11e19ab40002a5d5c51b"].data[0]);
      //console.log("LedStatus",  this.websocketService.ledStatus);
      this.ledStatus = this.websocketService.ledStatus;
      this.alarm.ledState = this.websocketService.ledStatus;
      //console.log(this.alarm.ledState);
      this.isAlarmButtonDisabled = false;
      if(this.websocketService.ledStatus == 1){
        this.localNotifications.schedule({
          id: 1,
          text: 'Alerte'
        });
      }
      if (isNaN(this.websocketService.ledStatus)) {
        this.websocketService.ledStatus = ("true" === data.status) ? 1 : 0;
      }
      for (var k = 0; k < $('.led-status').length; k++) {
        var value = $('.led-status').eq(k).data('status');
        if (parseInt(value) === this.websocketService.ledStatus) {
          $('.led-status').eq(k).show();
        }
      }
    };
  }

  ionViewWillEnter(){
    if(this.alarm.ledState!=null){
      this.ledStatus = this.alarm.ledState;
      //console.log(this.ledStatus);
    }
  }

  SetLedState() {
    this.websocketService.socketLedwrite.send(JSON.stringify({
      action: "setState",
      status: !this.websocketService.ledStatus
    }));

  }

  setDoorState(){
    this.websocketService.socketDoors.send(JSON.stringify({
      status: 0
    }));
  }

  openCloseDoors() {
    if (this.showImage){
      this.showImage = false;
    }else{
      this.showImage = true;
    }
  }

  closeAlert(){
    this.alarm.isAlertActivated = false;
  }

  toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
  }

  getDateDebutFin() {
    let HeureDebutObj = new Date(this.HeureDebut);
    let HeureFinObj = new Date(this.HeureFin);
    let DateDebutObj = new Date(this.DateDebut);
    let DateFinObj = new Date(this.DateFin);
    DateDebutObj.setHours(HeureDebutObj.getHours(), HeureDebutObj.getMinutes());
    DateFinObj.setHours(HeureFinObj.getHours(), HeureFinObj.getMinutes());
    let datedeb: string;
    let datefin: string;
    datedeb = this.toTimestamp(DateDebutObj).toString().replace(".", "");
    datefin = this.toTimestamp(DateFinObj).toString().replace(".", "");
    //console.log("http://192.168.43.136:1880/getpictures?dateMax=" + datefin + "&dateMin=" + datedeb + "&ledState=1");
    this.httpClient.get("http://192.168.43.136:1880/getpictures?dateMax=" + datefin + "&dateMin=" + datedeb + "&ledState=1", {}).subscribe((data) => {
      this.items = data;
    }, (error) => {});
    this.showhideslides = true;
  }

  hideslides() {
    this.showhideslides = false;
  }
}
