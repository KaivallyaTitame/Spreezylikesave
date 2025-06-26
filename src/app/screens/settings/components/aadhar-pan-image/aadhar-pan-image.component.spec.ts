import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AadharPanImageComponent } from './aadhar-pan-image.component';

describe('AadharPanImageComponent', () => {
  let component: AadharPanImageComponent;
  let fixture: ComponentFixture<AadharPanImageComponent>;

  beforeEach(async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: () => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6IkNvbnN1bWVyIiwidG9rZW5UeXBlIjoiYWNjZXNzIiwiaXNzIjoiU3ByZWV6eSIsInN1YiI6InRlc3QiLCJpYXQiOjE2MDAwMDAwMDAsImV4cCI6MTYwMDAwMDAwMH0.signature'
      },
      configurable: true
    });
    await TestBed.configureTestingModule({
      declarations: [AadharPanImageComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AadharPanImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
