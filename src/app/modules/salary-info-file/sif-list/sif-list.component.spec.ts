import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SifListComponent } from './sif-list.component';

describe('SifListComponent', () => {
  let component: SifListComponent;
  let fixture: ComponentFixture<SifListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SifListComponent]
    });
    fixture = TestBed.createComponent(SifListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
