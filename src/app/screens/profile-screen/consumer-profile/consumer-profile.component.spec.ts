import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConsumerProfileComponent } from './consumer-profile.component';

describe('ConsumerProfileComponent', () => {
  let component: ConsumerProfileComponent;
  let fixture: ComponentFixture<ConsumerProfileComponent>;

  beforeEach(async () => {
    // Mock ActivatedRoute with paramMap.subscribe
    const activatedRouteMock = {
      paramMap: {
        subscribe: (fn: (params: any) => void) => fn({ get: () => 'testId' })
      }
    };
    await TestBed.configureTestingModule({
      declarations: [ConsumerProfileComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsumerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
