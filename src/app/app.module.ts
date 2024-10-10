import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "src/environments/environment.development";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginModule } from "./screens/login/login.module";
<<<<<<< HEAD
<<<<<<< HEAD
import { GlobalErrorHandlerService } from "./services/global-error-handler.service";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { BusinessHomeModule } from "./screens/business-home/business-home.module";
import { ConsumerHomeModule } from "./screens/consumer-home/consumer-home.module";
<<<<<<< HEAD
=======
import { ReactiveFormsModule } from "@angular/forms";
import { RegisterModule } from "./screens/register/register.module";
>>>>>>> 015b527 (changes after pulling from develop)

@NgModule({
  declarations: [
    AppComponent
  ],
<<<<<<< HEAD
=======
import { OtpComponent } from './otp/otp.component';
=======
import { ReactiveFormsModule } from "@angular/forms";
>>>>>>> 00d6748 (otpscreenui)

@NgModule({
<<<<<<< HEAD
  declarations: [AppComponent, OtpComponent],
>>>>>>> 6e5649e (Update LoginScreen1)
=======
  declarations: [AppComponent],
>>>>>>> e090634 (otpscreenui)
=======
=======
>>>>>>> 20f3341 (login functinality is working)
=======
import { GlobalErrorHandlerService } from "./services/global-error-handler.service";
>>>>>>> a8a8c40 (done changes as asked in pr)
import { ReactiveFormsModule } from "@angular/forms";
import { RegisterModule } from "./screens/register/register.module";
@NgModule({
<<<<<<< HEAD
<<<<<<< HEAD
  declarations: [AppComponent, OtpscreenComponent], 
>>>>>>> 3789018 (Post blocker)
=======
  declarations: [AppComponent, OtpscreenComponent],
>>>>>>> a8a8c40 (done changes as asked in pr)
=======
  declarations: [AppComponent],
>>>>>>> fd6032b (used popup component where needed to show error responses)
=======
>>>>>>> 015b527 (changes after pulling from develop)
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    LoginModule,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    BusinessHomeModule,
<<<<<<< HEAD
    ConsumerHomeModule
  ],
  exports: [
    LoginComponent 
=======
=======
    ReactiveFormsModule
>>>>>>> 00d6748 (otpscreenui)
    
>>>>>>> e090634 (otpscreenui)
=======
    ReactiveFormsModule ,
<<<<<<< HEAD
    LoaderComponent
>>>>>>> 20f3341 (login functinality is working)
=======
    LoaderComponent,
    RegisterModule
>>>>>>> a8a8c40 (done changes as asked in pr)
  ],
=======
    ReactiveFormsModule,
    RegisterModule,
],
>>>>>>> fd6032b (used popup component where needed to show error responses)
=======
    ConsumerHomeModule,
    ReactiveFormsModule,
    RegisterModule,
  ],
>>>>>>> 015b527 (changes after pulling from develop)
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}