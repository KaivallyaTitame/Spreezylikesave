import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessProfileComponent } from './business-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

describe('BusinessProfileComponent', () => {
  let component: BusinessProfileComponent;
  let fixture: ComponentFixture<BusinessProfileComponent>;

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

    // Mock ActivatedRoute with paramMap.subscribe
    const activatedRouteMock = {
      paramMap: {
        subscribe: (fn: (params: any) => void) => fn({ get: () => 'testUsername' })
      }
    };

    await TestBed.configureTestingModule({
      declarations: [BusinessProfileComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
