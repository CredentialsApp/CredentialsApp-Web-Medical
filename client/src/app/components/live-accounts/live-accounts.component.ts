import { Component, OnInit } from "@angular/core";
import { Patient } from "../../models/patientModel";

@Component({
  selector: "app-live-accounts",
  templateUrl: "./live-accounts.component.html",
  styleUrls: ["./live-accounts.component.scss"]
})
export class LiveAccountsComponent implements OnInit {
  patients: any[];
  constructor() {}

  ngOnInit() {
    this.patients = [
      { name: "#patient1" },
      { name: "#patient2" },
      { name: "#patient3" },
      { name: "#patient4" },
      { name: "#patient5" },
      { name: "#patient6" },
      { name: "#patient7" },
      { name: "#patient8" },
      { name: "#patient9" }
    ];
  }
}
