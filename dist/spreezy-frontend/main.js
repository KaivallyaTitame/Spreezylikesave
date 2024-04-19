"use strict";
(self["webpackChunkspreezy_frontend"] = self["webpackChunkspreezy_frontend"] || []).push([["main"],{

/***/ 3966:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppRoutingModule: () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);



const routes = [{
  path: "",
  redirectTo: "login",
  pathMatch: "full"
}, {
  path: "login",
  loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./screens/login/login.module */ 5439)).then(module => module.LoginModule)
}, {
  path: "home",
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_screens_home_home_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./screens/home/home.module */ 5243)).then(module => module.HomeModule)
}, {
  path: "register",
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_screens_register_register_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./screens/register/register.module */ 9587)).then(module => module.RegisterModule)
}];
class AppRoutingModule {
  static #_ = this.ɵfac = function AppRoutingModule_Factory(t) {
    return new (t || AppRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: AppRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forRoot(routes), _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
  });
})();

/***/ }),

/***/ 6401:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 7947);


class AppComponent {
  constructor() {
    this.title = 'spreezy-frontend';
  }
  static #_ = this.ɵfac = function AppComponent_Factory(t) {
    return new (t || AppComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: AppComponent,
    selectors: [["app-root"]],
    decls: 1,
    vars: 0,
    template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 8629:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _angular_fire_compat__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/fire/compat */ 5281);
/* harmony import */ var src_environments_environment_development__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment.development */ 5516);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ 3966);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ 6401);
/* harmony import */ var _screens_login_login_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./screens/login/login.module */ 5439);
/* harmony import */ var _services_global_error_handler_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/global-error-handler.service */ 9848);











class AppModule {
  static #_ = this.ɵfac = function AppModule_Factory(t) {
    return new (t || AppModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
    type: AppModule,
    bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent]
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
    providers: [{
      provide: _angular_core__WEBPACK_IMPORTED_MODULE_5__.ErrorHandler,
      useClass: _services_global_error_handler_service__WEBPACK_IMPORTED_MODULE_4__.GlobalErrorHandlerService
    }],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.BrowserModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_1__.AppRoutingModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpClientModule, _angular_fire_compat__WEBPACK_IMPORTED_MODULE_8__.AngularFireModule.initializeApp(src_environments_environment_development__WEBPACK_IMPORTED_MODULE_0__.environment.firebase), _screens_login_login_module__WEBPACK_IMPORTED_MODULE_3__.LoginModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.BrowserModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_1__.AppRoutingModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpClientModule, _angular_fire_compat__WEBPACK_IMPORTED_MODULE_8__.AngularFireModule, _screens_login_login_module__WEBPACK_IMPORTED_MODULE_3__.LoginModule]
  });
})();

/***/ }),

/***/ 7590:
/*!*****************************************************************!*\
  !*** ./src/app/components/alert-popup/alert-popup.component.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlertPopupComponent: () => (/* binding */ AlertPopupComponent)
/* harmony export */ });
/* harmony import */ var src_app_models_alert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/models/alert */ 6916);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_shared_alert_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/alert.service */ 1854);



class AlertPopupComponent {
  constructor(alertService) {
    this.alertService = alertService;
    this.title = "";
    this.message = "";
    this.isModelOpen = false;
    this.alert = new src_app_models_alert__WEBPACK_IMPORTED_MODULE_0__.Alert("", "");
    this.alertService.receiveAlertTrigger().subscribe({
      next: alert => {
        this.triggerAlert(alert);
      },
      error: error => {
        console.log(error.message);
      }
    });
  }
  triggerAlert(alert) {
    this.title = alert.title;
    this.message = alert.message;
    this.isModelOpen = true;
  }
  static #_ = this.ɵfac = function AlertPopupComponent_Factory(t) {
    return new (t || AlertPopupComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_shared_alert_service__WEBPACK_IMPORTED_MODULE_1__.AlertService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: AlertPopupComponent,
    selectors: [["app-alert-popup"]],
    decls: 10,
    vars: 3,
    consts: [["id", "alert", "type", "checkbox", 1, "modal-state", 3, "checked"], [1, "modal"], ["for", "alert", 1, "modal-overlay"], [1, "modal-content", "flex", "flex-col", "gap-5", "w-96"], ["for", "alert", 1, "btn", "btn-sm", "btn-circle", "btn-ghost", "absolute", "right-2", "top-2", 3, "click"], [1, "text-xl"]],
    template: function AlertPopupComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "label", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 3)(4, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AlertPopupComponent_Template_label_click_4_listener() {
          return ctx.isModelOpen = !ctx.isModelOpen;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "\u2715");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "h2", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("checked", ctx.isModelOpen);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.message);
      }
    },
    encapsulation: 2
  });
}

/***/ }),

/***/ 6916:
/*!*********************************!*\
  !*** ./src/app/models/alert.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Alert: () => (/* binding */ Alert)
/* harmony export */ });
class Alert {
  constructor(title, message) {
    this.title = "";
    this.message = "";
    this.title = title;
    this.message = message;
  }
}

/***/ }),

/***/ 1470:
/*!***************************************!*\
  !*** ./src/app/models/credentials.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Credentials: () => (/* binding */ Credentials)
/* harmony export */ });
class Credentials {
  constructor() {
    this.email = "";
    this.password = "";
  }
}

/***/ }),

/***/ 6140:
/*!********************************************!*\
  !*** ./src/app/models/spreezyException.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SpreezyError: () => (/* binding */ SpreezyError),
/* harmony export */   SpreezyException: () => (/* binding */ SpreezyException)
/* harmony export */ });
class SpreezyError {
  constructor(name, message) {
    this.name = name;
    this.message = message;
  }
}
var SpreezyException;
(function (SpreezyException) {
  SpreezyException["SPEX_0"] = "Unknown Error";
  SpreezyException["SPEX_1"] = "Invalid Credentials";
  SpreezyException["SPEX_2"] = "Multiple attempts failed";
  SpreezyException["SPEX_3"] = "Registration failed";
  SpreezyException["SPEX_4"] = "Login Exception";
  SpreezyException["SPEX_5"] = "Logout Exception";
})(SpreezyException || (SpreezyException = {}));

/***/ }),

/***/ 4371:
/*!*******************************************************!*\
  !*** ./src/app/screens/login/login-routing.module.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginRoutingModule: () => (/* binding */ LoginRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.component */ 9438);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);




const routes = [{
  path: "",
  component: _login_component__WEBPACK_IMPORTED_MODULE_0__.LoginComponent
}];
class LoginRoutingModule {
  static #_ = this.ɵfac = function LoginRoutingModule_Factory(t) {
    return new (t || LoginRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: LoginRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](LoginRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 9438:
/*!**************************************************!*\
  !*** ./src/app/screens/login/login.component.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginComponent: () => (/* binding */ LoginComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var src_app_models_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/models/credentials */ 1470);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/auth.service */ 2333);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _ng_icons_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ng-icons/core */ 8888);
/* harmony import */ var src_app_components_alert_popup_alert_popup_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/components/alert-popup/alert-popup.component */ 7590);









function LoginComponent_span_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Email is required. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function LoginComponent_span_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Please provide a valid email. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function LoginComponent_span_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Password is required.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function LoginComponent_span_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Password too short.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function LoginComponent_span_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Password too long.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
class LoginComponent {
  constructor(authService, formBuilder) {
    this.authService = authService;
    this.formBuilder = formBuilder;
    this.credentials = new src_app_models_credentials__WEBPACK_IMPORTED_MODULE_0__.Credentials();
    this.icon = "ionEyeOff";
    this.showPassword = false;
    this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroup({
      email: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl("", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.email]),
      password: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl("", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.minLength(6), _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.maxLength(20)])
    });
    this.submitted = false;
  }
  get formControls() {
    return this.form.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.credentials.email = this.form.value.email;
    this.credentials.password = this.form.value.password;
    this.authService.login(this.credentials);
  }
  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }
  viewPassword() {
    this.showPassword = !this.showPassword;
    this.toggleIcon();
  }
  toggleIcon() {
    this.icon === "ionEyeOff" ? this.icon = "ionEye" : this.icon = "ionEyeOff";
  }
  static #_ = this.ɵfac = function LoginComponent_Factory(t) {
    return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: LoginComponent,
    selectors: [["app-login"]],
    decls: 43,
    vars: 8,
    consts: [[1, "bg-white"], [1, "flex", "justify-center"], [1, "logo", "mt-5", "w-40", "h-40"], ["src", "assets/logo.png", 1, "object-fill"], [1, "flex", "justify-center", "font-primary", "text-primary-0", "text-3xl"], [1, "mt-5", "flex", "justify-center", 3, "formGroup", "ngSubmit"], [1, "login-form", "w-80"], [1, "form-group", "email"], ["for", "email-input", 1, "form-label", "font-secondary", "text-primary-0"], ["id", "email-input", "placeholder", "Enter your email address", "type", "email", "formControlName", "email", 1, "form-control", "input", "input-primary", "max-w-full"], ["class", "font-secondary text-primary-0 text-sm ml-3", 4, "ngIf"], [1, "form-group", "password", "relative", "mt-5"], ["for", "password-input", 1, "form-label", "font-secondary", "text-primary-0"], ["id", "password-input", "placeholder", "Enter your password", "formControlName", "password", 1, "form-control", "input", "input-primary", "max-w-full", 3, "type"], [1, "absolute", "right-5", "top-11"], [3, "name", "click"], [1, "forget-password", "mt-2"], ["routerLink", "/forgetPassword", "routerLinkActive", "active", 1, "text-sm", "flex", "justify-end", "font-secondary", "text-primary-0"], [1, "buttons", "flex", "justify-center", "mt-5"], ["type", "", 1, "btn", "btn-primary", "btn-md", "font-secondary", "w-40", "mr-10"], ["type", "", "routerLink", "/register", "routerLinkActive", "active", "a", "", 1, "btn", "btn-primary", "btn-md", "font-secondary", "w-40"], [1, "divider", "divider-horizontal"], [1, "sso-login", "flex", "justify-center", "mt-5"], ["type", "button", 1, "btn", "gap-2", "bg-blue-50", "w-72", 3, "click"], ["stroke", "currentColor", "fill", "currentColor", "stroke-width", "0", "version", "1.1", "viewBox", "0 0 48 48", "enablebackground", "new 0 0 48 48", "xmlns", "http://www.w3.org/2000/svg", 1, "h-5", "w-5"], ["fill", "#FFC107", "d", "M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"], ["fill", "#FF3D00", "d", "M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657        C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"], ["fill", "#4CAF50", "d", "M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36        c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"], ["fill", "#1976D2", "d", "M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571\n                c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"], [1, "text-gray-500"], [1, "font-secondary", "text-primary-0", "text-sm", "ml-3"]],
    template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Welcome to Spreezy");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "form", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngSubmit", function LoginComponent_Template_form_ngSubmit_6_listener() {
          return ctx.onSubmit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 6)(8, "div", 7)(9, "label", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "Email address :");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](11, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](12, LoginComponent_span_12_Template, 2, 0, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](13, LoginComponent_span_13_Template, 2, 0, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "div", 11)(15, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16, "Password :");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](17, "input", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](18, LoginComponent_span_18_Template, 2, 0, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](19, LoginComponent_span_19_Template, 2, 0, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](20, LoginComponent_span_20_Template, 2, 0, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "div", 14)(22, "ng-icon", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function LoginComponent_Template_ng_icon_click_22_listener() {
          return ctx.viewPassword();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "div", 16)(24, "a", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](25, "Forgot Password?");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](26, "div", 18)(27, "button", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](28, " Login ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](29, "button", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](30, " Sign Up ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](31, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](32, "OR");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](33, "div", 22)(34, "button", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function LoginComponent_Template_button_click_34_listener() {
          return ctx.signInWithGoogle();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](35, "svg", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](36, "path", 25)(37, "path", 26)(38, "path", 27)(39, "path", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](40, "span", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](41, "Sign up with Google");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](42, "app-alert-popup");
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.form.controls["email"].hasError("required") && ctx.submitted);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.form.controls["email"].hasError("email") && ctx.submitted);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("type", ctx.showPassword === false ? "password" : "text");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.form.controls["password"].hasError("required") && ctx.submitted);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.form.controls["password"].hasError("minlength") && ctx.submitted);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.form.controls["password"].hasError("maxlength") && ctx.submitted);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("name", ctx.icon);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterLink, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterLinkActive, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName, _ng_icons_core__WEBPACK_IMPORTED_MODULE_7__.NgIcon, src_app_components_alert_popup_alert_popup_component__WEBPACK_IMPORTED_MODULE_2__.AlertPopupComponent],
    encapsulation: 2
  });
}

/***/ }),

/***/ 5439:
/*!***********************************************!*\
  !*** ./src/app/screens/login/login.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginModule: () => (/* binding */ LoginModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _ng_icons_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-icons/core */ 8888);
/* harmony import */ var _ng_icons_ionicons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ng-icons/ionicons */ 470);
/* harmony import */ var src_app_components_alert_popup_alert_popup_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/alert-popup/alert-popup.component */ 7590);
/* harmony import */ var _login_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login-routing.module */ 4371);
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.component */ 9438);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);









class LoginModule {
  static #_ = this.ɵfac = function LoginModule_Factory(t) {
    return new (t || LoginModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: LoginModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _login_routing_module__WEBPACK_IMPORTED_MODULE_1__.LoginRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule, _ng_icons_core__WEBPACK_IMPORTED_MODULE_6__.NgIconsModule.withIcons({
      ionEye: _ng_icons_ionicons__WEBPACK_IMPORTED_MODULE_7__.ionEye,
      ionEyeOff: _ng_icons_ionicons__WEBPACK_IMPORTED_MODULE_7__.ionEyeOff
    })]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](LoginModule, {
    declarations: [_login_component__WEBPACK_IMPORTED_MODULE_2__.LoginComponent, src_app_components_alert_popup_alert_popup_component__WEBPACK_IMPORTED_MODULE_0__.AlertPopupComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _login_routing_module__WEBPACK_IMPORTED_MODULE_1__.LoginRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule, _ng_icons_core__WEBPACK_IMPORTED_MODULE_6__.NgIconsModule]
  });
})();

/***/ }),

/***/ 2333:
/*!******************************************!*\
  !*** ./src/app/services/auth.service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthService: () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/auth */ 222);
/* harmony import */ var _models_alert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/alert */ 6916);
/* harmony import */ var _models_spreezyException__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/spreezyException */ 6140);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_fire_compat_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/fire/compat/auth */ 6075);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _shared_alert_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/alert.service */ 1854);







class AuthService {
  constructor(fireAuth, router, alertService) {
    this.fireAuth = fireAuth;
    this.router = router;
    this.alertService = alertService;
    this.alert = new _models_alert__WEBPACK_IMPORTED_MODULE_0__.Alert("", "");
  }
  login(credentials) {
    this.fireAuth.signInWithEmailAndPassword(credentials.email, credentials.password).then(user => {
      localStorage.setItem("token", credentials.email);
      this.router.navigate(["/home"]);
    }).catch(error => {
      switch (error.code) {
        case "auth/too-many-requests":
          {
            throw new _models_spreezyException__WEBPACK_IMPORTED_MODULE_1__.SpreezyError(_models_spreezyException__WEBPACK_IMPORTED_MODULE_1__.SpreezyException.SPEX_2, "Multiple login attempts failed. Please try after sometime.");
          }
        case "auth/invalid-credentials":
          {
            throw new _models_spreezyException__WEBPACK_IMPORTED_MODULE_1__.SpreezyError(_models_spreezyException__WEBPACK_IMPORTED_MODULE_1__.SpreezyException.SPEX_1, "Validate username and password.");
          }
        default:
          {
            throw new _models_spreezyException__WEBPACK_IMPORTED_MODULE_1__.SpreezyError(_models_spreezyException__WEBPACK_IMPORTED_MODULE_1__.SpreezyException.SPEX_0, "Unknown error has occured. We will look into it. Please try again after sometime.");
          }
      }
    });
  }
  registerWithCredentials(credentials) {
    this.fireAuth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(user => {
      this.alertService.sendAlertTrigger(new _models_alert__WEBPACK_IMPORTED_MODULE_0__.Alert("Registration completed", "User has been successfully registered."));
      this.router.navigate(["/login"]);
    }, error => {
      throw new _models_spreezyException__WEBPACK_IMPORTED_MODULE_1__.SpreezyError(_models_spreezyException__WEBPACK_IMPORTED_MODULE_1__.SpreezyException.SPEX_3, "Error occured while registering you. Try again after sometime.");
    });
  }
  logout() {
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem("token");
      this.router.navigate(["/login"]);
    }, error => {
      this.router.navigate(["/login"]);
      throw new _models_spreezyException__WEBPACK_IMPORTED_MODULE_1__.SpreezyError(_models_spreezyException__WEBPACK_IMPORTED_MODULE_1__.SpreezyException.SPEX_5, "Error occured while logging out. Try again after sometime.");
    });
  }
  signInWithGoogle() {
    return this.fireAuth.signInWithPopup(new _angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__.GoogleAuthProvider()).then(response => {
      this.router.navigate(["/home"]);
      localStorage.setItem("token", JSON.stringify(response.user?.email));
    }, error => {
      this.router.navigate(["/login"]);
      throw new _models_spreezyException__WEBPACK_IMPORTED_MODULE_1__.SpreezyError(_models_spreezyException__WEBPACK_IMPORTED_MODULE_1__.SpreezyException.SPEX_4, "Error occured while logging in. Try again after sometime.");
    });
  }
  static #_ = this.ɵfac = function AuthService_Factory(t) {
    return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_fire_compat_auth__WEBPACK_IMPORTED_MODULE_5__.AngularFireAuth), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_shared_alert_service__WEBPACK_IMPORTED_MODULE_2__.AlertService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: AuthService,
    factory: AuthService.ɵfac,
    providedIn: "root"
  });
}

/***/ }),

/***/ 9848:
/*!**********************************************************!*\
  !*** ./src/app/services/global-error-handler.service.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GlobalErrorHandlerService: () => (/* binding */ GlobalErrorHandlerService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _models_alert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/alert */ 6916);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _shared_alert_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/alert.service */ 1854);




class GlobalErrorHandlerService {
  constructor(alertService, zone) {
    this.alertService = alertService;
    this.zone = zone;
  }
  handleError(error) {
    if (!(error instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpErrorResponse)) {
      error = error.rejection; // get the error object
    }

    this.zone.run(() => {
      this.alertService.sendAlertTrigger(new _models_alert__WEBPACK_IMPORTED_MODULE_0__.Alert(error.name, error.message));
    });
  }
  static #_ = this.ɵfac = function GlobalErrorHandlerService_Factory(t) {
    return new (t || GlobalErrorHandlerService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_shared_alert_service__WEBPACK_IMPORTED_MODULE_1__.AlertService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgZone));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: GlobalErrorHandlerService,
    factory: GlobalErrorHandlerService.ɵfac,
    providedIn: "root"
  });
}

/***/ }),

/***/ 1854:
/*!*****************************************!*\
  !*** ./src/app/shared/alert.service.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlertService: () => (/* binding */ AlertService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 5400);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);


class AlertService {
  constructor() {
    this.alertTrigger = new rxjs__WEBPACK_IMPORTED_MODULE_0__.ReplaySubject(1);
    this.alertTriggerReceiver = this.alertTrigger.asObservable();
  }
  sendAlertTrigger(alert) {
    this.alertTrigger.next(alert);
  }
  receiveAlertTrigger() {
    return this.alertTrigger.asObservable();
  }
  static #_ = this.ɵfac = function AlertService_Factory(t) {
    return new (t || AlertService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: AlertService,
    factory: AlertService.ɵfac,
    providedIn: "root"
  });
}

/***/ }),

/***/ 5516:
/*!*****************************************************!*\
  !*** ./src/environments/environment.development.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
const environment = {
  production: false,
  apiGateway: "http://localhost:8080",
  firebase: {
    apiKey: "AIzaSyAefHwV7r5LaXZHjcE3U0wxxBlQhA3BqwE",
    authDomain: "spreezy-auth.firebaseapp.com",
    projectId: "spreezy-auth",
    storageBucket: "spreezy-auth.appspot.com",
    messagingSenderId: "492287029620",
    appId: "1:492287029620:web:9222629f83e9d6445c7c21",
    measurementId: "G-YSTYFGXMMY"
  }
};

/***/ }),

/***/ 4913:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 8629);


_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4913)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map