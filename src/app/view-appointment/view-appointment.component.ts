import { Component, OnInit } from "@angular/core";
import { UserService } from "../_services/index";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-view-appointment",
  templateUrl: "./view-appointment.component.html",
  styleUrls: ["./view-appointment.component.css"],
})
export class ViewAppointmentComponent implements OnInit {
  trainee_data = [];
  isdataLoaded = false;

  editTraineedataForm = this.fb.group({
    firstname: [null, [Validators.required]],
  });

  constructor(
    private _userService: UserService,
    public fb: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {

    this._userService.getfitnessdata().subscribe((data) => {
      this._activatedRoute.params.subscribe((paramaters) => {
        if (paramaters["preference"]) {
          this.trainee_data = data.filter(
            (trainee) =>
              trainee.trainerpreference.toLowerCase() ===
              paramaters["preference"].toLowerCase()
          );
        } else {
          this.trainee_data = data;
        }
        this.isdataLoaded = true;
      });
    });
  }

  deleteTrainee(Id) {
    this._userService.deletefitnessdata(Id).subscribe((data) => {
      location.reload(true);
    });
  }

  editTraniee(Id) {
    this._router.navigateByUrl("edit-fitness-trainer-appointment/" + Id);
  }

  getfitness() {}
}
