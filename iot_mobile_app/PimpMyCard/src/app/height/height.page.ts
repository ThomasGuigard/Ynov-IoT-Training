import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-height',
  templateUrl: './height.page.html',
  styleUrls: ['./height.page.scss'],
})
export class HeightPage implements OnInit {

  accDatas: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.accDatas = JSON.parse(params.special);
        console.log(this.accDatas);
      }
    });
  }

  ngOnInit() {
  }

}
