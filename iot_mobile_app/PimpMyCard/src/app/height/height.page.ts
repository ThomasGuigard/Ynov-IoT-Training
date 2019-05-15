import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-height',
  templateUrl: './height.page.html',
  styleUrls: ['./height.page.scss'],
})
export class HeightPage implements OnInit {

  accDatas: any;
  heightDatas : Array<any>;
  angleDatas : Array<any>;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.heightDatas = new Array<any>();
    this.angleDatas = new Array<any>();
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.accDatas = JSON.parse(params.special);
        for (let index = 0; index < this.accDatas.length; index++) {
          this.heightDatas.push(this.accDatas[index].acc);
        }
        console.log(this.heightDatas);
        for (let index = 0; index < this.heightDatas.length; index++) {
          this.angleDatas.push(this.calculateXAngle(this.heightDatas[index]));
        }
      }
    });
  }

  ngOnInit() {
  }

  calculateXAngle(accXYZ){
    var accxyzArray = this.formatAccData(accXYZ);
    let downOperant: number = Math.sqrt(Math.pow(accxyzArray[1], 2) + Math.pow(accxyzArray[2], 2));
    var xAngle = Math.atan(accxyzArray[0] / downOperant);
    xAngle = (xAngle * 180) / Math.PI;
    return xAngle.toFixed(2);
  }

  formatAccData(accxyz) {
    var accxyzArray = accxyz.split(',');
    for (let index = 0; index < accxyzArray.length; index++) {
      accxyzArray[index] = accxyzArray[index].replace('[', '').replace(']', '');
    }
    return accxyzArray;
  }

}
