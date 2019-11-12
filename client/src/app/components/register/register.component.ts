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
      this.toastr.success("Private Key:");
    }
  }
}
