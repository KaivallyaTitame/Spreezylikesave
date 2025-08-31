import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PasswordManagementComponent } from './password-management.component';

describe('PasswordManagementComponent', () => {
  let component: PasswordManagementComponent;
  let fixture: ComponentFixture<PasswordManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordManagementComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
