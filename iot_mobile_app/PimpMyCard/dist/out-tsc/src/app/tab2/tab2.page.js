import * as tslib_1 from "tslib";
import { TemperatureServiceService } from './../IoT/temperature-service.service';
import { Component } from '@angular/core';
var Tab2Page = /** @class */ (function () {
    function Tab2Page(tempService) {
        this.temp = 0;
        this.tempService = null;
    }
    Tab2Page.prototype.ngOnInit = function () {
        console.log(this.tempService);
        this.temp = this.tempService.currentTemp;
    };
    Tab2Page.prototype.setTemp = function () {
        //this.temp = 42;
        //this.temp = this.tempService.currentTemp;
    };
    Tab2Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab2',
            templateUrl: 'tab2.page.html',
            styleUrls: ['tab2.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [TemperatureServiceService])
    ], Tab2Page);
    return Tab2Page;
}());
export { Tab2Page };
//# sourceMappingURL=tab2.page.js.map