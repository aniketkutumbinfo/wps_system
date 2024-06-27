import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifConfigComponent } from './dif-config.component';

describe('DifConfigComponent', () => {
  let component: DifConfigComponent;
  let fixture: ComponentFixture<DifConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DifConfigComponent]
    });
    fixture = TestBed.createComponent(DifConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
