import { Component, OnInit } from "@angular/core";
import { Patient } from "../../models/patientModel";
import { Router, RouterLink } from "@angular/router";
import { PatientService } from "../../services/patient.service";

@Component({
  selector: "app-live-accounts",
  templateUrl: "./live-accounts.component.html",
  styleUrls: ["./live-accounts.component.scss"]
})
export class LiveAccountsComponent implements OnInit {
  private patients: Array<Patient>;
  constructor(private router: Router, private patientService: PatientService) {}

  ngOnInit() {
    this.getPatientList();
  }

  route(accountData): any {
    this.router.navigate(["/accountDetails"], {
      state: { data: { accountData } }
    });
  }

  getPatientList(): any {
    this.patientService.getPatientList().subscribe(res => {
      this.patients = res;
    });
  }
}
