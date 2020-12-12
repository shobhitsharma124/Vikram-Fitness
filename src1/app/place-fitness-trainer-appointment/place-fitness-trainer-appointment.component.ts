import { Component, OnInit,NgModule } from '@angular/core';
import {  FormGroup,FormBuilder, Validators } from "@angular/forms";
import { UserService } from '../_services/index';
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";

export class Fitness {
  constructor(
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname:string,
    public lastname: string,
    public age:number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages : string

  ) { }
}

@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html',
  styleUrls:['./place-fitness-trainer-appointment.component.css']
  
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {

  
country_list : any = ['Australia','America','Canada','Dubai','France','India','Kenya','Libia'];
  

  navigatedToEdit = false;
  idToEdit = -1;

  wordSequence = /[a-zA-Z ]/g;
  numberSequence = /[0-9]/g;
  
  fitnessForm = this.fb.group({
    firstname: [null, [Validators.required, Validators.pattern(this.wordSequence)]],
    lastname: [null, [Validators.required,Validators.pattern(this.wordSequence)]],
    phonenumber: [null, [Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
    email:[null, [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    streetaddress:[null, [Validators.required]],
    paisa:[null, [Validators.required]],
    physiotherapist:[null, [Validators.required]],
    trainerpreference:[null, [Validators.required]],
    age:[null, [Validators.required, Validators.min(18), Validators.max(60)]],
    pincode:[null, [Validators.required, Validators.maxLength(6), Validators.minLength(6), Validators.pattern(this.numberSequence)]],
    country:[null, [Validators.required]],
    state:[null, [Validators.required]],
    city:[null, [Validators.required]],
    inr:[null, [Validators.required]],
    packages:[null, [Validators.required]]
  })
  
  

  constructor(public fb : FormBuilder,
      private _userService : UserService, private _activatedRoute: ActivatedRoute) { }
  

  setFormReadyForEdit(dataOftrainee){
  console.log(dataOftrainee);
  const{

  age,
        city,
        country,
        email,
        firstname,
        id,
        inr,
        lastname,
        paisa,
        phonenumber,
        physiotherapist,
        pincode,
        state,
        streetaddress,
        trainerpreference
  } = dataOftrainee[0];


  this.fitnessForm.patchValue({
        
        age,
        city,
        country,
        email,
        firstname,
        id,
        inr,
        lastname,
        paisa,
        phonenumber,
        physiotherapist,
        pincode,
        state,
        streetaddress,
        trainerpreference

  });
  this.idToEdit = id;
  this.navigatedToEdit = true;
  }
	
	
  ngOnInit() {

    if(this._activatedRoute.snapshot.paramMap.get("id")){
    this._userService.getfitnessdata().subscribe(data => {
    this.setFormReadyForEdit(data.filter(trainee => {
    if(parseInt(trainee["id"]) === parseInt(this._activatedRoute.snapshot.paramMap.get("id")))
    return trainee;
     
        }))
      })
    }
  }
  amount(times){
  switch(times){
  case 'one': this.fitnessForm.patchValue({inr:500,paisa:0});break;
  case 'four': this.fitnessForm.patchValue({inr:1600,paisa:0});break;
  case 'five': this.fitnessForm.patchValue({inr:1500,paisa:0});break;
  default : this.fitnessForm.patchValue({inr:0,paisa:0});break; 
  }
  }

  onSubmit() {
  console.log(this.fitnessForm);
    const {firstname,
            lastname,
            phonenumber,
            city,
            state, 
            pincode,
            streetaddress,
            country,
            email,
            age,
            physiotherapist,
            trainerpreference,
          inr,paisa,packages} = this.fitnessForm.controls;
    console.log(packages.value);
    console.log(trainerpreference.value);
    console.log(inr.value);
    if(this.fitnessForm.status === 'VALID'){

        const fitnessObject = new Fitness(inr.value,paisa.value,streetaddress.value,city.value,state.value,country.value,pincode.value,phonenumber.value,email.value,firstname.value,lastname.value,age.value,trainerpreference.value,physiotherapist.value, packages.value);

        if(this.navigatedToEdit){
        this._userService.updatefitnessdata(fitnessObject, this.idToEdit).subscribe(data => {console.log(data);
        alert('Traniee updated')});
        }

        else{
        this._userService.postfitnessdata(fitnessObject).subscribe(data => {console.log(data);
        alert('Form submitted')})
        }
    }else{
      alert('form invalid')
    }
  }
    
}
