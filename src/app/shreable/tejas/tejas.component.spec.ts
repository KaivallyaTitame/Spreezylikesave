import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TejasComponent } from './tejas.component';

describe('TejasComponent', () => {
  let component: TejasComponent;
  let fixture: ComponentFixture<TejasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TejasComponent]
    });
    fixture = TestBed.createComponent(TejasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
