import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AckAckListComponent } from './ack-ack-list.component';

describe('AckAckListComponent', () => {
  let component: AckAckListComponent;
  let fixture: ComponentFixture<AckAckListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AckAckListComponent]
    });
    fixture = TestBed.createComponent(AckAckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
