import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AckAckDetailComponent } from './ack-ack-detail.component';

describe('AckAckDetailComponent', () => {
  let component: AckAckDetailComponent;
  let fixture: ComponentFixture<AckAckDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AckAckDetailComponent]
    });
    fixture = TestBed.createComponent(AckAckDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
