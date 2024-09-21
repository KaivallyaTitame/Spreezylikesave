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
<<<<<<< HEAD
=======
import { LogoutModule } from "./screens/logout/logout.module";
>>>>>>> 79946b6 (business-home working with docker integration)
import { GlobalErrorHandlerService } from "./services/global-error-handler.service";
<<<<<<< HEAD
import { BusinessHomeModule } from "./screens/business-home/business-home.module";
import { ConsumerHomeModule } from "./screens/consumer-home/consumer-home.module";
<<<<<<< HEAD
=======
import { ReactiveFormsModule } from "@angular/forms";
import { RegisterModule } from "./screens/register/register.module";

=======
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from "./screens/login/login.component";
// import { ConsumerHomeModule } from "./screens/consumer-home/consumer-home.module";
import { BusinessHomeModule } from "./screens/business-home/business-home.module";
>>>>>>> ed04675 (improved folder and file structure, edited names of consumer and business navigation bars)

@NgModule({
  declarations: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    LoginModule,
    FontAwesomeModule,
    // ConsumerHomeModule,
    // BusinessHomeModule
  ],
  exports: [
    LoginComponent 
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService,
    },
    
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule {}