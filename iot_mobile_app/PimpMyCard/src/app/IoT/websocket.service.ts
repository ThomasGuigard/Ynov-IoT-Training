import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socketTemp: any
  socketHum: any
  socketAcc: any
  socketCam: any
  serverIp: any
  currentTemp: number

  constructor() {
    this.serverIp = "192.168.43.136";
    this.socketTemp = new WebSocket("ws://" + this.serverIp + ":1880/temp");
    this.socketHum = new WebSocket("ws://" + this.serverIp + ":1880/hum");
    this.socketAcc = new WebSocket("ws://" + this.serverIp + ":1880/acc");
    this.socketCam = new WebSocket("ws://" + this.serverIp + ":1880/camera");
    //console.log("ws://" + this.serverIp + ":1880/temp");
  }
}
