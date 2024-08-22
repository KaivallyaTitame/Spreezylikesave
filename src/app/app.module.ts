import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "src/environments/environment.development";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginModule } from "./screens/login/login.module";
<<<<<<< HEAD
import { LogoutModule } from "./screens/logout/logout.module";
=======
<<<<<<< HEAD
>>>>>>> e3c8cc1 (login functinality is working)
import { GlobalErrorHandlerService } from "./services/global-error-handler.service";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 586572a (Addressed Review comments)
=======
>>>>>>> b40fe67 (Update LoginScreen1)
=======
>>>>>>> 6ab50cc (otpscreenui)
=======
>>>>>>> 952c569 (Post blocker)
import { BusinessHomeModule } from "./screens/business-home/business-home.module";
import { ConsumerHomeModule } from "./screens/consumer-home/consumer-home.module";
<<<<<<< HEAD
=======
import { ReactiveFormsModule } from "@angular/forms";
import { RegisterModule } from "./screens/register/register.module";

=======
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BusinessHomeModule } from "./screens/business-home/business-home.module";
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> ed04675 (improved folder and file structure, edited names of consumer and business navigation bars)
=======
import { AddPostModule } from "./screens/add-post/add-post.module";
import { BusinessInsightsModule } from "./screens/insights/insights.module";
import { NotificationScreenModule } from "./screens/notification-screen/notification-screen.module";
import { ProfileScreenModule } from "./screens/profile-screen/profile-screen.module";
import { HomeModule } from "./screens/home-screen/home-screen.module";
import { ConsumerHomeModule } from "./screens/consumer-home/consumer-home.module";
import { SearchModule } from "./screens/search/search.module";

>>>>>>> 1a45171 (Business and consumer navigation bar working)
=======
import { ConsumerHomeModule } from "./screens/consumer-home/consumer-home.module";
>>>>>>> 15ab62a (Corrected Routes for consumer-home and business-home)

@NgModule({
  declarations: [
    AppComponent
  ],
<<<<<<< HEAD
  declarations: [
    AppComponent
  ],
=======
=======
import { OtpComponent } from './otp/otp.component';
=======
import { ReactiveFormsModule } from "@angular/forms";
>>>>>>> 00d6748 (otpscreenui)

@NgModule({
<<<<<<< HEAD
  declarations: [AppComponent, OtpComponent],
>>>>>>> 6e5649e (Update LoginScreen1)
<<<<<<< HEAD
>>>>>>> b40fe67 (Update LoginScreen1)
=======
=======
  declarations: [AppComponent],
>>>>>>> e090634 (otpscreenui)
<<<<<<< HEAD
>>>>>>> f8ce701 (otpscreenui)
=======
=======
=======
>>>>>>> 20f3341 (login functinality is working)
import { ReactiveFormsModule } from "@angular/forms";
import { OtpscreenComponent } from "./screens/otpscreen/otpscreen.component";
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  declarations: [AppComponent, OtpscreenComponent], 
>>>>>>> 3789018 (Post blocker)
>>>>>>> 952c569 (Post blocker)
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