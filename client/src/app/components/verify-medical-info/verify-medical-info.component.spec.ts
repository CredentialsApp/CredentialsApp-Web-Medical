import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyMedicalInfoComponent } from './verify-medical-info.component';

describe('VerifyMedicalInfoComponent', () => {
  let component: VerifyMedicalInfoComponent;
  let fixture: ComponentFixture<VerifyMedicalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyMedicalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyMedicalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
