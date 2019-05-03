import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var TemperatureServiceService = /** @class */ (function () {
    function TemperatureServiceService() {
        this.currentTemp = null;
        this.serverIp = "192.168.189.128";
        this.socketTemp = new WebSocket("ws://" + this.serverIp + ":1880/temp");
        console.log("ws://" + this.serverIp + ":1880/temp");
        /*
        this.socketTemp.onopen = function () {
            $.ajax({
                url: "http://80.214.210.101:1880/temperature",
                dataType: "json",
                success: function (data) {
                    for (var i = 0; i < data.length; i++) {
                      this.socketTemp.addTempData(data[i]);
                    }
                }
            });
        };*/
    }
    TemperatureServiceService.prototype.ngOnInit = function () {
        console.log("onInit");
        this.socketTemp.onmessage = function (msg) {
            console.log(msg.data);
            this.currentTemp = JSON.parse(msg.data);
        };
    };
    TemperatureServiceService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], TemperatureServiceService);
    return TemperatureServiceService;
}());
export { TemperatureServiceService };
//# sourceMappingURL=temperature-service.service.js.map