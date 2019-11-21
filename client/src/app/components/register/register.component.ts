import { Component, OnInit, DoCheck } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { CryptologyService } from "src/app/services/cryptology.service";
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
  user = new User();
  buttonDisable: boolean = true;
  constructor(
    private toastr: ToastrService,
    private cryptologyService: CryptologyService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  ngDoCheck() {
    if (
      this.user.doctorName &&
      this.user.clinicName &&
      this.user.password &&
      this.user.rePassword
    ) {
      this.buttonDisable = false;
    } else {
      this.buttonDisable = true;
    }
  }

  register(): any {
    if (this.user.password !== this.user.rePassword) {
      this.toastr.error("Passwords do not match");
    } else {
      var registeredUser = this.cryptologyService.encryption(this.user);
      this.authService.insertUser(registeredUser).subscribe(res => {
        this.toastr.success("Registered Succesfull!");
        this.router.navigate(["/liveAccounts"]);
        console.log("success log");
      });
    }
  }
}
