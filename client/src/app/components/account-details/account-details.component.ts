import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-account-details",
  templateUrl: "./account-details.component.html",
  styleUrls: ["./account-details.component.scss"]
})
export class AccountDetailsComponent implements OnInit {
  accountDetail = {};
  constructor() {}

  ngOnInit() {
    console.log(history.state.data.accountData);
    this.accountDetail = history.state.data.accountData;
  }
}
