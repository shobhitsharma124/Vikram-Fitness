import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/index';
import {  FormGroup,FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";


@Component({
selector: 'app-view-appointment',
templateUrl: './view-appointment.component.html',
styleUrls:["./view-appointment.component.css"]
})
export class ViewAppointmentComponent implements OnInit {

trainee_data = [];
isdataLoaded = false;


editTraineedataForm = this.fb.group({
firstname: [null, [Validators.required]]
})


constructor(private _userService : UserService, public fb : FormBuilder,
private _router: Router,private _activatedRoute: ActivatedRoute,

) {

console.log("Constructor") }


ngOnChanges(){
console.log("Change")
}  

ngOnInit() {

console.log("Init called")
this._userService.getfitnessdata().subscribe(data => 
{

this._activatedRoute.params.subscribe(paramaters => {
if(paramaters["preference"]){
this.trainee_data = data.filter(trainee => trainee.trainerpreference.toLowerCase() === paramaters["preference"].toLowerCase())
console.log(this.trainee_data);


}else{
this.trainee_data = data;
// console.log(this.trainee_data);
}
this.isdataLoaded = true;

})
})


//console.log(this._activatedRoute.snapshot.paramMap.get("preference"))
}

deleteTrainee(Id){
console.log('trainee deleted',Id);
this._userService.deletefitnessdata(Id).subscribe(data => {
console.log(data);
location.reload(true);

})

}

editTraniee(Id){

this._router.navigateByUrl("edit-fitness-trainer-appointment/"+Id)
}

getfitness() {

}
}
