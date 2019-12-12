import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BleConnectComponent } from './ble-connect.component';

describe('BleConnectComponent', () => {
  let component: BleConnectComponent;
  let fixture: ComponentFixture<BleConnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BleConnectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BleConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
