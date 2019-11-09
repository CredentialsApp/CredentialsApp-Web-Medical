import { Component, OnInit } from "@angular/core";
import { User } from "../../models/userModel";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  doctorName: string;
  clinicName: string;
  password: string;
  rePassword: string;
  constructor() {}

  ngOnInit() {}

  register(): void {
    var model = {
      doctorName: this.doctorName,
      clinicName: this.clinicName,
      password: this.password,
      rePassword: this.rePassword
    };
    console.log(model);
  }
}
