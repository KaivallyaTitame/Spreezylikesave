import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BusinessInformationComponent } from './business-information.component';

describe('BusinessInformationComponent', () => {
  let component: BusinessInformationComponent;
  let fixture: ComponentFixture<BusinessInformationComponent>;

  beforeEach(async () => {
    // Robust localStorage mock for all standard methods
    const localStorageMock = {
      getItem: (key: string) =>
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6IkNvbnN1bWVyIiwidG9rZW5UeXBlIjoiYWNjZXNzIiwiaXNzIjoiU3ByZWV6eSIsInN1YiI6InRlc3QiLCJpYXQiOjE2MDAwMDAwMDAsImV4cCI6MTYwMDAwMDAwMH0.signature',
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(),
      length: 1
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      configurable: true
    });
    await TestBed.configureTestingModule({
      declarations: [BusinessInformationComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
