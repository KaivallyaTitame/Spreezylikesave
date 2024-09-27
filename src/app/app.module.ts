import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "src/environments/environment.development";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginModule } from "./screens/login/login.module";
import { LogoutModule } from "./screens/logout/logout.module";
import { GlobalErrorHandlerService } from "./services/global-error-handler.service";
import { BusinessHomeModule } from "./screens/business-home/business-home.module";
import { ConsumerHomeModule } from "./screens/consumer-home/consumer-home.module";
import { ReactiveFormsModule } from "@angular/forms";
import { RegisterModule } from "./screens/register/register.module";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from "./screens/login/login.component";
import { BusinessHomeModule } from "./screens/business-home/business-home.module";
import { AddPostModule } from "./screens/add-post/add-post.module";
import { BusinessInsightsModule } from "./screens/insights/insights.module";
import { NotificationScreenModule } from "./screens/notification-screen/notification-screen.module";
import { ProfileScreenModule } from "./screens/profile-screen/profile-screen.module";
import { HomeModule } from "./screens/home-screen/home-screen.module";
import { ConsumerHomeModule } from "./screens/consumer-home/consumer-home.module";
import { SearchModule } from "./screens/search/search.module";


@NgModule({
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
    AddPostModule,
    BusinessInsightsModule,
    HomeModule,
    NotificationScreenModule,
    ProfileScreenModule,
    SearchModule,
    ConsumerHomeModule
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