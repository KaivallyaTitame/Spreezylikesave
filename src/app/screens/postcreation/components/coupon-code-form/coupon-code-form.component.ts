import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CouponDetails } from "src/app/models/coupon-details";
import { JwtDecoderService } from "src/app/services/jwtDecoder/jwt-decoder.service";
import { PostUploadService } from "src/app/services/post-upload.service";
import { TextareaUtils } from "src/app/shared/textarea-utils";

@Component({
  selector: "app-coupon-code-form",
  templateUrl: "./coupon-code-form.component.html",
  styleUrls: ["./coupon-code-form.component.css"],
})
export class CouponCodeFormComponent {
  imageFileNamesUpdated: boolean = false;
  couponCodeFormDetails: FormGroup;
  couponCodeData: CouponDetails = new CouponDetails();
  imageFileNames: string[] = [];
  username: string = "";
  businessId: string = "";
  showPopUp: boolean = false;
  popUpTitle: string = "";
  popUpBody: string = "";

  constructor(
    private fb: FormBuilder,
    private postUpload: PostUploadService,
    private jwtDecoder: JwtDecoderService
  ) {
    this.couponCodeFormDetails = this.fb.group({
      imageFileNames: [[]],
      couponTitle: [""],
      username: [""],
      description: [""],
      promoBadge: ["", [Validators.maxLength(10)]],
      couponCode: [""],
      businessId: [""],
      websiteLink: ["https://example.com"],
      termsAndConditions: [""],
      stepsToAvailOffer: [""],
      expiry: [null],
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem("token");

    const decodedInfo = token
      ? this.jwtDecoder.decodeInfoFromToken(token)
      : this.jwtDecoder.decodeInfoFromToken("");
    this.username = decodedInfo["sub"];
    this.businessId = decodedInfo["sub"];

    this.couponCodeFormDetails.get("username")?.setValue(this.username);
    this.couponCodeFormDetails.get("businessId")?.setValue(this.businessId);

    this.postUpload.generatedFileNames$.subscribe((fileNames: string[]) => {
      this.imageFileNames = fileNames;
      this.couponCodeFormDetails
        .get("imageFileNames")
        ?.setValue(this.imageFileNames);
    });

    const websiteLinkInput = document.getElementById(
      "websiteLink"
    ) as HTMLInputElement;

    // Ensure the input always starts with 'https://'
    websiteLinkInput.addEventListener("input", (event) => {
      const input = event.target as HTMLInputElement;

      // Prevent changes to the fixed prefix
      if (!input.value.startsWith("https://")) {
        input.value = "https://" + input.value.replace(/^https?:\/\//, "");
      }
    });

    // Optional: Ensure cursor starts after the fixed part
    websiteLinkInput.addEventListener("focus", () => {
      setTimeout(() => {
        websiteLinkInput.setSelectionRange(8, websiteLinkInput.value.length);
      }, 0);
    });
  }

  handleSubmit() {
    if (this.couponCodeFormDetails.valid) {
      this.createRequest(this.couponCodeFormDetails);
    } else {
      this.popUpTitle = "Error!";
      this.popUpBody = "Please fill out form correctly";
      this.showPopUp = true;
      this.couponCodeFormDetails.reset();
    }
  }

  createRequest(details: FormGroup) {
    this.couponCodeData.imageFileNames = this.imageFileNames;
    this.couponCodeData.couponTitle = details.value["couponTitle"].trim();
    this.couponCodeData.username = this.username;
    this.couponCodeData.description = details.value["description"].trim();
    this.couponCodeData.websiteLink = details.value["websiteLink"].trim();
    this.couponCodeData.promoBadge = details.value["promoBadge"].trim();
    this.couponCodeData.couponCode = details.value["couponCode"].trim();
    this.couponCodeData.businessId = this.businessId;
    this.couponCodeData.termsAndConditions = TextareaUtils.removeBulletPoints(
      details.value["termsAndConditions"]?.trim() || ""
    );
    this.couponCodeData.stepsToAvailOffer = TextareaUtils.removeBulletPoints(
      details.value["stepsToAvailOffer"]?.trim() || ""
    );

    this.couponCodeData.expiry = details.value["expiry"];

    this.processRequest(this.couponCodeData);
  }

  processRequest(couponCodeData: CouponDetails) {
    this.postUpload.submitCouponData(couponCodeData).subscribe({
      next: () => {
        this.popUpTitle = "Success!";
        this.popUpBody =
          "Your coupon code form has been submitted successfully.";
        this.showPopUp = true;
        this.resetForm();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error Details:', error);
        throw(error); 
      }
    });
  }

  onPopUpClose() {
    this.showPopUp = false;
  }

  addBulletPointOnEnter(
    event: KeyboardEvent,
    textarea: HTMLTextAreaElement
  ): void {
    TextareaUtils.addBulletPointOnEnter(event, textarea);
  }

  addBulletPointOnFocus(textarea: HTMLTextAreaElement): void {
    TextareaUtils.addBulletPointOnFocus(textarea);
  }

  resetForm(): void {
    this.couponCodeFormDetails.reset();
    this.imageFileNamesUpdated = true;
  }
}
