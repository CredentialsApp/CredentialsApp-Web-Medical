import { Component, OnInit } from "@angular/core";
import { User } from "../../models/userModel";
import * as CryptoJS from "crypto-js";

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
  secret: string =
    "4107E215B2E4907348E67E4B77FA7CC0DF1897DB342316520DBA5ED9CB0E1C1B";
  constructor() {}

  ngOnInit() {}

  register(): any {
    var model = {
      doctorName: this.doctorName,
      clinicName: this.clinicName,
      password: this.password,
      rePassword: this.rePassword
    };

    var cryptedDoctorName = CryptoJS.HmacSHA256(
      model.doctorName,
      this.secret
    ).toString();

    console.log(cryptedDoctorName);
  }
}
