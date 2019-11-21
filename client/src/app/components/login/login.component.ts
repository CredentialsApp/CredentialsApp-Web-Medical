import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  hash: string;
  constructor() {}

  ngOnInit() {
    this.hash = history.state.data.registeredUser.hashWithoutPassword;
  }
}
