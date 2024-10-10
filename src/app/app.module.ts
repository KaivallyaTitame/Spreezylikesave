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
import { LogoutModule } from "./screens/logout/logout.module";
=======
<<<<<<< HEAD
>>>>>>> e3c8cc1 (login functinality is working)
=======
<<<<<<< HEAD
>>>>>>> ed7e1fa (done changes as asked in pr)
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
=======
<<<<<<< HEAD
=======
import { ReactiveFormsModule } from "@angular/forms";
import { RegisterModule } from "./screens/register/register.module";
>>>>>>> 015b527 (changes after pulling from develop)
>>>>>>> d472ce0 (changes after pulling from develop)

@NgModule({
  declarations: [
    AppComponent
  ],
<<<<<<< HEAD
<<<<<<< HEAD
  declarations: [
    AppComponent
  ],
=======
=======
>>>>>>> d472ce0 (changes after pulling from develop)
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
=======
import { GlobalErrorHandlerService } from "./services/global-error-handler.service";
>>>>>>> a8a8c40 (done changes as asked in pr)
import { ReactiveFormsModule } from "@angular/forms";
import { OtpscreenComponent } from "./screens/otpscreen/otpscreen.component";
import { LoaderComponent } from './components/loader/loader.component';
import { RegisterModule } from "./screens/register/register.module";
@NgModule({
<<<<<<< HEAD
<<<<<<< HEAD
  declarations: [AppComponent, OtpscreenComponent], 
>>>>>>> 3789018 (Post blocker)
<<<<<<< HEAD
>>>>>>> 952c569 (Post blocker)
=======
=======
  declarations: [AppComponent, OtpscreenComponent],
>>>>>>> a8a8c40 (done changes as asked in pr)
<<<<<<< HEAD
>>>>>>> ed7e1fa (done changes as asked in pr)
=======
=======
  declarations: [AppComponent],
>>>>>>> fd6032b (used popup component where needed to show error responses)
<<<<<<< HEAD
>>>>>>> 16b96f6 (used popup component where needed to show error responses)
=======
=======
>>>>>>> 015b527 (changes after pulling from develop)
>>>>>>> d472ce0 (changes after pulling from develop)
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