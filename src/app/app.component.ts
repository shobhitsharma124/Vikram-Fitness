import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "angularSPA";
  logValue = "LOGIN";
  userValue = "Guest";

  searchedValue = null;
 
  constructor(private router: Router) {}

  landingpage() {
    this.router.navigateByUrl("landing-page");
  }

  searchTrainee() {
    if (this.searchedValue) {
      this.router.navigateByUrl(
        "view-appointment/" + this.searchedValue
      );
    }
  }

  loginFunction() {
    if (this.logValue === "LOGOUT") {
      this.logValue = "LOGIN";
      this.userValue = "Guest";
    } else {
      this.logValue = "LOGOUT";
      this.userValue = "User";
    }
  }

  placeAppointment() {
    this.router.navigateByUrl("place-fitness-trainer-appointment");
  }
  viewAppointment() {
    this.router.navigateByUrl("view-appointment");
  }
  contactUspage() {
    this.router.navigateByUrl("contact-us");
  }
}
