import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../_services/index';

export class Contact {
  constructor(
    public firstname: string,
    public lastname: string,
    public phonenumber: number,
    public email: string,
    public message: string
  ) { }
}
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls:['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  @Output() contactdata = new EventEmitter<Contact>();
  contactForm: FormGroup;
  public obj: any = {};

    wordSequence = /[a-zA-Z ]/g;

  constructor(private fb: FormBuilder,private _userService : UserService) { }


  ngOnInit() {
    this.contactForm = this.fb.group({
      firstname: ["", [Validators.required, Validators.pattern(this.wordSequence)]],
      lastname: ["", [Validators.required, Validators.pattern(this.wordSequence)]],
      phonenumber: ["", [Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      email: ["", [Validators.required,Validators.pattern("[^ @]*@[^ @]*"),Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      message:["",[Validators.required]]
    });
  }

  onSubmit() {
    this.obj = { ...this.contactForm.value, ...this.obj };
    this.contactForm.value;
    console.log(
      "LOG: LoginComponent -> onSubmit -> this.contactForm.value",
      this.contactForm.value
    );

    if (this.contactForm.valid) {
    const contactObject = new Contact(
          this.contactForm.value.firstname,
          this.contactForm.value.lastname,
          this.contactForm.value.phonenumber,
          this.contactForm.value.email,
          this.contactForm.value.message
        )
      this.contactdata.emit( contactObject );
      this._userService.postcontactusdata(contactObject).subscribe(data => {console.log(data);
        alert('Contact Submitted')})
    }

  else{
    alert('Contact NOT Submitted')}
  }
}
