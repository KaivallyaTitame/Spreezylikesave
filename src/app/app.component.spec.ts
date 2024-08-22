<<<<<<< HEAD
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture :  AppComponent;
  beforeEach(()=>{
    fixture=new AppComponent();
  })
  it('should have title spreezy-frontend',()=>{
    expect(fixture.title).toEqual('spreezy-frontend');
  })
})
=======
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  // it('should create the app', () => {
  //   expect(app).toBeTruthy();
  // });

  // it(`should have as title 'spreezy-frontend'`, () => {
  //   expect(app.title).toEqual('spreezy-frontend');
  // });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('spreezy-frontend app is running!');
  });
});
>>>>>>> 421cafb (login functinality is working)
