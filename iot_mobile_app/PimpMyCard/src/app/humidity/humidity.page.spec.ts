import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumidityPage } from './humidity.page';

describe('HumidityPage', () => {
  let component: HumidityPage;
  let fixture: ComponentFixture<HumidityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumidityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumidityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
