import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfaViewComponent } from './rfa-view.component';

describe('RfaViewComponent', () => {
  let component: RfaViewComponent;
  let fixture: ComponentFixture<RfaViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RfaViewComponent]
    });
    fixture = TestBed.createComponent(RfaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
