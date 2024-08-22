import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "src/environments/environment.development";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginModule } from "./screens/login/login.module";
<<<<<<< HEAD
import { GlobalErrorHandlerService } from "./services/global-error-handler.service";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { BusinessHomeModule } from "./screens/business-home/business-home.module";
import { ConsumerHomeModule } from "./screens/consumer-home/consumer-home.module";

@NgModule({
  declarations: [
    AppComponent
  ],
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
import { ReactiveFormsModule } from "@angular/forms";
import { OtpscreenComponent } from "./screens/otpscreen/otpscreen.component";
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  declarations: [AppComponent, OtpscreenComponent], 
>>>>>>> 3789018 (Post blocker)
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    LoginModule,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    BusinessHomeModule,
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
    LoaderComponent
>>>>>>> 20f3341 (login functinality is working)
  ],
  providers: [
    {
      provide: ErrorHandler,
      // useClass: GlobalErrorHandlerService,
    },
    
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule {}