import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AckNckListComponent } from './ack-nck-list.component';

describe('AckNckListComponent', () => {
  let component: AckNckListComponent;
  let fixture: ComponentFixture<AckNckListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AckNckListComponent]
    });
    fixture = TestBed.createComponent(AckNckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
