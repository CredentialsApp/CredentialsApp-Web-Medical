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
    var doctorNameHash = CryptoJS.SHA256(this.doctorName).toString(
      CryptoJS.enc.Hex
    );

    var clinicNameHash = CryptoJS.SHA256(this.clinicName).toString(
      CryptoJS.enc.Hex
    );

    var passwordHash = CryptoJS.SHA256(this.password).toString(
      CryptoJS.enc.Hex
    );

    var hash =
      doctorNameHash + "ffffffff" + clinicNameHash + "ffffffff" + passwordHash;

    var privateKey = CryptoJS.SHA256(hash, this.secret).toString();
  }
}
