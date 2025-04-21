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
import { registerModule } from "./screens/Registration/register/register.module";
import { SkeletonComponent } from './skeleton/skeleton.component';

@NgModule({
declarations: [
AppComponent,
SkeletonComponent
],
imports: [
BrowserModule,
AppRoutingModule,
HttpClientModule,
AngularFireModule.initializeApp(environment.firebase),  // THis functionality is disabled for temporary purpose
LoginModule,
LogoutModule,
BusinessHomeModule,
ConsumerHomeModule,
ReactiveFormsModule,
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