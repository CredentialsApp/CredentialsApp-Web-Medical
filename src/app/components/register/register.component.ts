import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
  DoCheck
} from "@angular/core";
import { User } from "../../models/userModel";
import * as CryptoJS from "crypto-js";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-home",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit, DoCheck {
  doctorName: string;
  clinicName: string;
  password: string;
  rePassword: string;
  buttonVisible: boolean = true;
  secret: string =
    "4107E215B2E4907348E67E4B77FA7CC0DF1897DB342316520DBA5ED9CB0E1C1B";
  constructor(private toastr: ToastrService) {}

  ngOnInit() {}

  ngDoCheck() {
    if (
      this.doctorName &&
      this.clinicName &&
      this.password &&
      this.rePassword
    ) {
      this.buttonVisible = false;
    } else {
      this.buttonVisible = true;
    }
  }

  register(): any {
    if (this.password !== this.rePassword) {
      this.toastr.error("Passwords do not match");
    } else {
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
        doctorNameHash +
        "ffffffff" +
        clinicNameHash +
        "ffffffff" +
        passwordHash;

      var privateKey = CryptoJS.SHA256(hash, this.secret).toString();

      this.toastr.success("Private Key:" + privateKey);
    }
  }
}
