import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeightPage } from './height.page';

describe('HeightPage', () => {
  let component: HeightPage;
  let fixture: ComponentFixture<HeightPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeightPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeightPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
