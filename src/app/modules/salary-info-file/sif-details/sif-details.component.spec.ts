import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SifDetailsComponent } from './sif-details.component';

describe('SifDetailsComponent', () => {
  let component: SifDetailsComponent;
  let fixture: ComponentFixture<SifDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SifDetailsComponent]
    });
    fixture = TestBed.createComponent(SifDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
