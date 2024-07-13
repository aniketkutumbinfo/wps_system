import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AckNckDetailComponent } from './ack-nck-detail.component';

describe('AckNckDetailComponent', () => {
  let component: AckNckDetailComponent;
  let fixture: ComponentFixture<AckNckDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AckNckDetailComponent]
    });
    fixture = TestBed.createComponent(AckNckDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
