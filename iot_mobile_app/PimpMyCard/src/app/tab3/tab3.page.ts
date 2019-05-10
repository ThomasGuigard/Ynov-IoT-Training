import { HttpClient } from '@angular/common/http';
import * as $ from "jquery";
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../IoT/websocket.service';
import { IonToggle } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';  
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
  LedButton : any;
  LedStatutToDisableToggle : number;
  DateDebut : Date;
  DateFin : Date;
  items : any;
  LiveButton : boolean = false;
  constructor(websocketService: WebsocketService, private localNotifications : LocalNotifications, private httpClient: HttpClient) {
    this.websocketService = websocketService;
  }

  ngOnInit() {
    this.websocketService.socketCam.onmessage = async (msg) => {
      if (this.LiveButton)
        this.picImage = "data:image/jpeg;base64," + JSON.parse(msg.data).base64;
  
    };

    this.websocketService.socketLed.onmessage = async (msg) => {
      var formatedMsg = msg.data.replace(/"{/g, '{').replace(/}"/g, '}').replace(/\\"/g, '"');
      //console.log("après modif : ", formatedMsg);
      var data = JSON.parse(formatedMsg);
      $('.led-status').hide();
      $('.btn-switch').removeClass("disabled");
      //console.log("après parse",data);
      this.websocketService.ledStatus = parseInt(data.led.characteristics["0c366e80cf3a11e19ab40002a5d5c51b"].data[0]);
      //console.log("LedStatus",  this.websocketService.ledStatus);
      if(this.websocketService.ledStatus == 1){
        this.localNotifications.schedule({
          id: 1,
          text: 'Alerte'
       });
      }
      //console.log("int parsed", parseInt(data.led.characteristics.data));
      //console.log(worker.ledStatus);
      if (isNaN(this.websocketService.ledStatus)) {
        this.websocketService.ledStatus = ("true" === data.status) ? 1 : 0;
      }
      for (var k = 0; k < $('.led-status').length; k++) {
        var value = $('.led-status').eq(k).data('status');
        if (parseInt(value) === this.websocketService.ledStatus) {
          $('.led-status').eq(k).show();
        }
      }
      //this.LedStatus = false;
    };



  }

  SetLedState() {
    this.websocketService.socketLedwrite.send(JSON.stringify({
      action: "setState",
      status: !this.websocketService.ledStatus
    }));

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

   toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
   }
  GetDateDebutFin(){                            
    //"http://192.168.43.136:1880/getpictures?dateMax=1557493543463&dateMin=1557493149928&ledState=1"
   let datedeb : string; 
   let datefin : string; 
   datedeb = this.toTimestamp(this.DateDebut).toString().replace(".","");
   datefin = this.toTimestamp(this.DateFin).toString().replace(".","");
   console.log("http://192.168.43.136:1880/getpictures?dateMax="+datefin+"&dateMin="+datedeb+"&ledState=1");
   this.httpClient.get("http://192.168.43.136:1880/getpictures?dateMax="+datefin+"&dateMin="+datedeb+"&ledState=1", {}).subscribe((data) => {
      this.items = data;
    }, (error) => {
      
    });
  }
}
