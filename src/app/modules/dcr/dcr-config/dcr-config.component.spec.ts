import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcrConfigComponent } from './dcr-config.component';

describe('DcrConfigComponent', () => {
  let component: DcrConfigComponent;
  let fixture: ComponentFixture<DcrConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DcrConfigComponent]
    });
    fixture = TestBed.createComponent(DcrConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
