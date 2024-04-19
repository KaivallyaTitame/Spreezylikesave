"use strict";
(self["webpackChunkspreezy_frontend"] = self["webpackChunkspreezy_frontend"] || []).push([["src_app_screens_register_register_module_ts"],{

/***/ 9147:
/*!********************************!*\
  !*** ./src/app/models/user.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   User: () => (/* binding */ User)
/* harmony export */ });
class User {
  constructor() {
    this.uid = "";
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.username = "";
    this.password = "";
  }
}

/***/ }),

/***/ 5821:
/*!*************************************************************!*\
  !*** ./src/app/screens/register/register-routing.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RegisterRoutingModule: () => (/* binding */ RegisterRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _register_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./register.component */ 8136);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);




const routes = [{
  path: '',
  component: _register_component__WEBPACK_IMPORTED_MODULE_0__.RegisterComponent
}];
class RegisterRoutingModule {
  static #_ = this.ɵfac = function RegisterRoutingModule_Factory(t) {
    return new (t || RegisterRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: RegisterRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](RegisterRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 8136:
/*!********************************************************!*\
  !*** ./src/app/screens/register/register.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RegisterComponent: () => (/* binding */ RegisterComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var src_app_models_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/models/user */ 9147);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_services_customer_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/customer.service */ 7124);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _ng_icons_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-icons/core */ 8888);








function RegisterComponent_span_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Please provide your first name. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function RegisterComponent_span_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Please provide your last name. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function RegisterComponent_span_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Username is required. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function RegisterComponent_span_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Email is required. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function RegisterComponent_span_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Please provide a valid email. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function RegisterComponent_span_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Password is required.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function RegisterComponent_span_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Password too short.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function RegisterComponent_span_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Password too long.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function RegisterComponent_span_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Password is required.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function RegisterComponent_span_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Password too short.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function RegisterComponent_span_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Password too long.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function RegisterComponent_span_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Passwords must match. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
class RegisterComponent {
  constructor(customerService) {
    this.customerService = customerService;
    this.user = new src_app_models_user__WEBPACK_IMPORTED_MODULE_0__.User();
    this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroup({
      firstName: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl("", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]),
      lastName: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl("", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]),
      username: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl("", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.maxLength(20)]),
      email: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl("", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.email]),
      password: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl("", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.minLength(6), _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.maxLength(20)]),
      confirmPassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl("", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.minLength(6), _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.maxLength(20)]),
      confirmPolicies: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(false, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.requiredTrue])
    });
    this.showNewPassword = false;
    this.showConfirmNewPassword = false;
    this.newPasswordIcon = "ionEyeOff";
    this.confirmPasswordIcon = "ionEyeOff";
  }
  get formControls() {
    return this.form.controls;
  }
  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
    this.toggleNewPasswordIcon();
  }
  toggleConfirmNewPassword() {
    this.showConfirmNewPassword = !this.showConfirmNewPassword;
    this.toggleConfirmPasswordIcon();
  }
  toggleNewPasswordIcon() {
    this.newPasswordIcon === "ionEyeOff" ? this.newPasswordIcon = "ionEye" : this.newPasswordIcon = "ionEyeOff";
  }
  toggleConfirmPasswordIcon() {
    this.confirmPasswordIcon === "ionEyeOff" ? this.confirmPasswordIcon = "ionEye" : this.confirmPasswordIcon = "ionEyeOff";
  }
  registerUser() {
    this.user = this.mapUserData(this.form);
    this.customerService.registerNewUser(this.user);
  }
  mapUserData(form) {
    let user = new src_app_models_user__WEBPACK_IMPORTED_MODULE_0__.User();
    user.firstName = form.get("firstName")?.value;
    user.lastName = form.get("lastName")?.value;
    user.email = form.get("email")?.value;
    user.username = form.get("username")?.value;
    user.password = form.get("password")?.value;
    return user;
  }
  static #_ = this.ɵfac = function RegisterComponent_Factory(t) {
    return new (t || RegisterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_customer_service__WEBPACK_IMPORTED_MODULE_1__.CustomerService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: RegisterComponent,
    selectors: [["app-register"]],
    decls: 57,
    vars: 18,
    consts: [[1, "bg-white"], [1, "flex", "justify-center", "font-primary", "text-primary-0", "text-3xl", "mt-5"], [1, "flex", "justify-center", 3, "formGroup", "ngSubmit"], [1, "signup-form", "w-80", "relative"], [1, "first-name", "mt-3"], [1, "form-label", "pb-2", "font-secondary", "text-primary-0"], ["type", "text", "placeholder", "First Name", "formControlName", "firstName", 1, "input", "input-primary", "max-w-full"], ["class", "font-secondary text-primary-0 text-sm ml-3", 4, "ngIf"], [1, "last-name", "mt-3"], ["type", "text", "placeholder", "Last Name", "formControlName", "lastName", 1, "input", "input-primary", "max-w-full"], [1, "username", "mt-3"], ["type", "text", "placeholder", "Username", "formControlName", "username", 1, "input", "input-primary", "max-w-full"], [1, "email", "mt-3"], ["type", "email", "placeholder", "Email", "formControlName", "email", 1, "input", "input-primary", "max-w-full"], [1, "password", "mt-3", "relative"], ["placeholder", "Password", "formControlName", "password", 1, "input", "input-primary", "max-w-full", 3, "type"], [1, "absolute", "right-5", "top-10"], [3, "name", "click"], ["placeholder", "Confirm Password", "formControlName", "confirmPassword", 1, "input", "input-primary", "max-w-full", 3, "type"], ["class", "font-secondary text-primary-0 text-sm ml-2", 4, "ngIf"], [1, "T&C", "mt-5"], [1, "flex", "cursor-pointer", "gap-2", "font-secondary", "text-sm"], ["type", "checkbox", "formControlName", "confirmPolicies", 1, "checkbox-primary", "checkbox"], ["href", "#", 1, "underline", "underline-offset-8", "decoration-primary-0"], [1, "buttons", "flex", "justify-center", "mt-5"], ["routerLink", "/login", "routerLinkActive", "active", 1, "btn", "btn-primary", "btn-md", "font-secondary", "w-20", "mr-10"], ["type", "submit", 1, "btn", "btn-primary", "btn-md", "font-secondary", "w-60", 3, "disabled"], [1, "font-secondary", "text-primary-0", "text-sm", "ml-3"], [1, "font-secondary", "text-primary-0", "text-sm", "ml-2"]],
    template: function RegisterComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Come join us...");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "form", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function RegisterComponent_Template_form_ngSubmit_3_listener() {
          return ctx.registerUser();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 3)(5, "div", 4)(6, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "First Name :");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, RegisterComponent_span_9_Template, 2, 0, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 8)(11, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Last Name :");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](13, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](14, RegisterComponent_span_14_Template, 2, 0, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 10)(16, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, "Username :");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](18, "input", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](19, RegisterComponent_span_19_Template, 2, 0, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "div", 12)(21, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, "Email :");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](23, "input", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](24, RegisterComponent_span_24_Template, 2, 0, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](25, RegisterComponent_span_25_Template, 2, 0, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "div", 14)(27, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28, "Password :");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](29, "input", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](30, "div", 16)(31, "ng-icon", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function RegisterComponent_Template_ng_icon_click_31_listener() {
          return ctx.toggleNewPassword();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](32, RegisterComponent_span_32_Template, 2, 0, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](33, RegisterComponent_span_33_Template, 2, 0, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](34, RegisterComponent_span_34_Template, 2, 0, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "div", 14)(36, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](37, "Re-enter your password :");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](38, "input", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](39, RegisterComponent_span_39_Template, 2, 0, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](40, RegisterComponent_span_40_Template, 2, 0, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](41, RegisterComponent_span_41_Template, 2, 0, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](42, RegisterComponent_span_42_Template, 2, 0, "span", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](43, "div", 16)(44, "ng-icon", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function RegisterComponent_Template_ng_icon_click_44_listener() {
          return ctx.toggleConfirmNewPassword();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](45, "div", 20)(46, "label", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](47, "input", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](48, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](49, "I accept to the ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](50, "a", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](51, "Terms & Conditions.");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](52, "div", 24)(53, "button", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](54, " Back ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](55, "button", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](56, " SIGN UP ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.form.controls["firstName"].hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.form.controls["lastName"].hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.form.controls["username"].hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.form.controls["email"].hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.form.controls["email"].hasError("email"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("type", ctx.showNewPassword === false ? "password" : "text");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("name", ctx.newPasswordIcon);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.form.controls["password"].hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.form.controls["password"].hasError("minlength"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.form.controls["password"].hasError("maxlength"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("type", ctx.showConfirmNewPassword === false ? "password" : "text");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.form.controls["confirmPassword"].hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.form.controls["confirmPassword"].hasError("minlength"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.form.controls["confirmPassword"].hasError("maxlength"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.form.controls["password"].valid && ctx.form.controls["confirmPassword"].dirty && ctx.form.controls["password"].value !== ctx.form.controls["confirmPassword"].value);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("name", ctx.confirmPasswordIcon);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.form.invalid);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLinkActive, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, _ng_icons_core__WEBPACK_IMPORTED_MODULE_6__.NgIcon],
    encapsulation: 2
  });
}

/***/ }),

/***/ 9587:
/*!*****************************************************!*\
  !*** ./src/app/screens/register/register.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RegisterModule: () => (/* binding */ RegisterModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _ng_icons_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-icons/core */ 8888);
/* harmony import */ var _ng_icons_ionicons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-icons/ionicons */ 470);
/* harmony import */ var _register_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./register-routing.module */ 5821);
/* harmony import */ var _register_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./register.component */ 8136);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);








class RegisterModule {
  static #_ = this.ɵfac = function RegisterModule_Factory(t) {
    return new (t || RegisterModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: RegisterModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _register_routing_module__WEBPACK_IMPORTED_MODULE_0__.RegisterRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule, _ng_icons_core__WEBPACK_IMPORTED_MODULE_5__.NgIconsModule.withIcons({
      ionEye: _ng_icons_ionicons__WEBPACK_IMPORTED_MODULE_6__.ionEye,
      ionEyeOff: _ng_icons_ionicons__WEBPACK_IMPORTED_MODULE_6__.ionEyeOff
    })]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](RegisterModule, {
    declarations: [_register_component__WEBPACK_IMPORTED_MODULE_1__.RegisterComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _register_routing_module__WEBPACK_IMPORTED_MODULE_0__.RegisterRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule, _ng_icons_core__WEBPACK_IMPORTED_MODULE_5__.NgIconsModule]
  });
})();

/***/ }),

/***/ 7124:
/*!**********************************************!*\
  !*** ./src/app/services/customer.service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomerService: () => (/* binding */ CustomerService)
/* harmony export */ });
/* harmony import */ var _models_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/credentials */ 1470);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.service */ 2333);




class CustomerService {
  constructor(http, authService) {
    this.http = http;
    this.authService = authService;
  }
  registerNewUser(user) {
    this.registerToFirebase(user);
    this.persistUserData(user);
  }
  registerToFirebase(user) {
    let credentials = new _models_credentials__WEBPACK_IMPORTED_MODULE_0__.Credentials();
    credentials.email = user.email;
    credentials.password = user.password;
    this.authService.registerWithCredentials(credentials);
  }
  persistUserData(user) {
    // this.http.post(environment.apiGateway+"/registerUser").pipe();
  }
  static #_ = this.ɵfac = function CustomerService_Factory(t) {
    return new (t || CustomerService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: CustomerService,
    factory: CustomerService.ɵfac,
    providedIn: "root"
  });
}

/***/ })

}]);
//# sourceMappingURL=src_app_screens_register_register_module_ts.js.map