import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAccountsComponent } from './live-accounts.component';

describe('LiveAccountsComponent', () => {
  let component: LiveAccountsComponent;
  let fixture: ComponentFixture<LiveAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
