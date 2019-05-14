import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperaturePage } from './temperature.page';

describe('TemperaturePage', () => {
  let component: TemperaturePage;
  let fixture: ComponentFixture<TemperaturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperaturePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperaturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
