import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socketTemp : any
  serverIp : any
  currentTemp : number

  constructor() {
    this.serverIp = "192.168.189.128";
    this.socketTemp = new WebSocket("ws://" + this.serverIp + ":1880/temp");
    //console.log("ws://" + this.serverIp + ":1880/temp");
  }
}
