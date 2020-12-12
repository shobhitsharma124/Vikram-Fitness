import { Component} from '@angular/core';
import { Router } from "@angular/router";
import {  FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularSPA';
  logValue = 'LOGIN';
  userValue = 'Guest';   
   searchForm = this.fb.group({
    searchPref :[null,Validators.required]
  }) 
  constructor(private router: Router, private fb: FormBuilder,
  ) { }
  
     


 
  landingpage() {
    this.router.navigateByUrl("landing-page");
  }

  searchTrainee(){
    if(this.searchForm.valid) {
       this.router.navigateByUrl("view-appointment/" + this.searchForm.controls.searchPref.value);
  }}
  
  loginFunction(){
  if(this.logValue === "LOGOUT"){
    this.logValue = 'LOGIN';
    this.userValue = 'Guest';
  } else{
   this.logValue = "LOGOUT";
   this.userValue = "User"
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
