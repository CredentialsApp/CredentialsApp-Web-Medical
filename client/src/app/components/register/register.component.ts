import { Component, OnInit, DoCheck } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/userModel";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  providers: [ToastrService]
})
export class RegisterComponent implements OnInit, DoCheck {
  doctorName: string;
  clinicName: string;
  password: string;
  rePassword: string;
  buttonDisable: boolean = true;
  constructor(
    private toastr: ToastrService,
    private readonly authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  ngDoCheck() {
    if (
      this.doctorName &&
      this.clinicName &&
      this.password &&
      this.rePassword
    ) {
      this.buttonDisable = false;
    } else {
      this.buttonDisable = true;
    }
  }

  register(): any {
    if (this.password !== this.rePassword) {
      this.toastr.error("Passwords do not match");
    } else {
      var model = new User();
      model = {
        doctorName: this.doctorName,
        clinicName: this.clinicName,
        password: this.password
      };
      this.authService.encryption(model).subscribe(res => {
        this.toastr.success("Registered Succesfull!");
        this.router.navigate(["/liveAccounts"]);
      });
    }
  }
}
