import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EventDetails } from "src/app/models/event-details";
import { JwtDecoderService } from "src/app/services/jwtDecoder/jwt-decoder.service";
import { PostUploadService } from "src/app/services/post-upload.service";
import { TextareaUtils } from "src/app/shared/textarea-utils";

@Component({
  selector: "app-events-form",
  templateUrl: "./events-form.component.html",
  styleUrls: ["./events-form.component.css"],
})
export class EventsFormComponent {
  eventFormDetails: FormGroup;
  imageFileNamesUpdated: boolean = false;
  eventData: EventDetails = new EventDetails();
  username: string = "";
  businessId: string = "";
  imageFileNames: string[] = [];
  showPopUp: boolean = false;
  popUpTitle: string = "";
  popUpBody: string = "";

  constructor(
    private fb: FormBuilder,
    private postUpload: PostUploadService,
    private jwtDecoder: JwtDecoderService
  ) {
    this.eventFormDetails = this.fb.group({
      imageFileNames: [[]],
      username: [""],
      businessId: [""],
      eventTitle: [""],
      description: [""],
      websiteLink: ["https://example.com"],
      eventDateAndTime: [""],
      promoBadge: ["", [Validators.maxLength(10)]],
      expiry: [""],
      bookingUrl: [""],
      termsAndConditions: [""],
      stepsToAvailOffer: [""],
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem("token");

    const decodedInfo = token
      ? this.jwtDecoder.decodeInfoFromToken(token)
      : this.jwtDecoder.decodeInfoFromToken("");
    this.username = decodedInfo["sub"];
    this.businessId = decodedInfo["sub"];

    this.eventFormDetails.get("username")?.setValue(this.username);
    this.eventFormDetails.get("businessId")?.setValue(this.businessId);

    this.postUpload.generatedFileNames$.subscribe((fileNames: string[]) => {
      this.imageFileNames = fileNames;
      this.eventFormDetails
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
    if (this.eventFormDetails.valid) {
      this.createRequest(this.eventFormDetails);
    } else {
      this.popUpTitle = "Error!";
      this.popUpBody = "Please fill out form correctly";
      this.showPopUp = true;
      this.eventFormDetails.reset();
    }
  }

  createRequest(details: FormGroup) {
    this.eventData.imageFileNames = this.imageFileNames;
    this.eventData.eventTitle = details.value["eventTitle"].trim();
    this.eventData.description = details.value["description"].trim();
    this.eventData.eventDateAndTime = details.value["eventDateAndTime"]
      .toString()
      .trim();
    this.eventData.promoBadge = details.value["promoBadge"].trim();
    this.eventData.websiteLink = details.value["websiteLink"].trim();
    this.eventData.expiry = details.value["expiry"].toString().trim();
    this.eventData.bookingUrl = details.value["bookingUrl"].trim();
    this.eventData.termsAndConditions = TextareaUtils.removeBulletPoints(
      details.value["termsAndConditions"]?.trim() || ""
    );
    this.eventData.stepsToAvailOffer = TextareaUtils.removeBulletPoints(
      details.value["stepsToAvailOffer"]?.trim() || ""
    );
    this.eventData.businessId = this.businessId;
    this.eventData.username = this.username;

    this.processRequest(this.eventData);
  }

  processRequest(eventData: EventDetails) {
    this.postUpload.submitEventData(eventData).subscribe({
      next: (response: any) => {
        this.popUpTitle = "Success!";
        this.popUpBody = "Your event form has been submitted successfully.";
        this.showPopUp = true;
        this.eventFormDetails.reset();
      },
      error: (error: HttpErrorResponse) => {
        this.popUpTitle = "Error!";
        if (error.error && error.error.message) {
          this.popUpBody = `Error: ${error.error.message}`;
        } else {
          this.popUpBody = "Something went wrong. Please try again.";
        }
        this.showPopUp = true;
      },
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
    this.eventFormDetails.reset();
    this.imageFileNamesUpdated = true;
  }
}
