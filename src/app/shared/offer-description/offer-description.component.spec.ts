import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDescriptionComponent } from './offer-description.component';

describe('OfferDescriptionComponent', () => {
  let component: OfferDescriptionComponent;
  let fixture: ComponentFixture<OfferDescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferDescriptionComponent]
    });
    fixture = TestBed.createComponent(OfferDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
