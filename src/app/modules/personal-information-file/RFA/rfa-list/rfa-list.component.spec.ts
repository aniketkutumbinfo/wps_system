import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfaListComponent } from './rfa-list.component';

describe('RfaListComponent', () => {
  let component: RfaListComponent;
  let fixture: ComponentFixture<RfaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RfaListComponent]
    });
    fixture = TestBed.createComponent(RfaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
