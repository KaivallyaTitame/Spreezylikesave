import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AadharPanImageComponent } from './aadhar-pan-image.component';

describe('AadharPanImageComponent', () => {
  let component: AadharPanImageComponent;
  let fixture: ComponentFixture<AadharPanImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AadharPanImageComponent]
    });
    fixture = TestBed.createComponent(AadharPanImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
