import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewMyNotesComponent } from './review-my-notes.component';

describe('ReviewMyNotesComponent', () => {
  let component: ReviewMyNotesComponent;
  let fixture: ComponentFixture<ReviewMyNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewMyNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewMyNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
