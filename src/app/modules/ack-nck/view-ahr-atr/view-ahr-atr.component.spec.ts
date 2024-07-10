import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAhrAtrComponent } from './view-ahr-atr.component';

describe('ViewAhrAtrComponent', () => {
  let component: ViewAhrAtrComponent;
  let fixture: ComponentFixture<ViewAhrAtrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAhrAtrComponent]
    });
    fixture = TestBed.createComponent(ViewAhrAtrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
