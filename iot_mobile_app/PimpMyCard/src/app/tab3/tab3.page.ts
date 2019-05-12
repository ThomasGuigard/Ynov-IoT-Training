import { HttpClient } from '@angular/common/http';
import * as $ from "jquery";
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../IoT/websocket.service';
import { IonToggle, AlertController, ModalController, IonSlide, IonSlides } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Tab1Page } from '../tab1/tab1.page';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  websocketService: any = null;
  picImage: any;
  ShowImage: boolean = false;
  LedStatus: boolean;
  LedButton: any;
  LedStatutToDisableToggle: number;
  DateDebut: Date;
  HeureDebut: Date;
  HeureFin: Date;
  DateFin: Date;
  Slide: IonSlides;
  showhideslides: boolean = false;
  items: any;
  LiveButton: boolean = false;
  constructor(websocketService: WebsocketService, private localNotifications: LocalNotifications, private httpClient: HttpClient, public modalctrl: ModalController) {
    this.websocketService = websocketService;
  }

  ngOnInit() {
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
      if (this.websocketService.ledStatus == 1) {
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

  SetLedState() {
    this.websocketService.socketLedwrite.send(JSON.stringify({
      action: "setState",
      status: !this.websocketService.ledStatus
    }));

  }

  openCloseDoors() {
    if (this.ShowImage)
      this.ShowImage = false;
    else
      this.ShowImage = true;
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
    //console.log(dateObj4);
    let datedeb: string;
    let datefin: string;
    datedeb = this.toTimestamp(DateDebutObj).toString().replace(".", "");
    datefin = this.toTimestamp(DateFinObj).toString().replace(".", "");
    console.log("http://192.168.43.136:1880/getpictures?dateMax=" + datefin + "&dateMin=" + datedeb + "&ledState=1");
    this.httpClient.get("http://192.168.43.136:1880/getpictures?dateMax=" + datefin + "&dateMin=" + datedeb + "&ledState=1", {}).subscribe((data) => {
      this.items = data;
    }, (error) => {

    });

    this.showhideslides = true;

  }
  hideslides() {
    this.showhideslides = false;
  }

}
