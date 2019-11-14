import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifyPatientComponent } from './identify-patient.component';

describe('IdentifyPatientComponent', () => {
  let component: IdentifyPatientComponent;
  let fixture: ComponentFixture<IdentifyPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentifyPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifyPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
