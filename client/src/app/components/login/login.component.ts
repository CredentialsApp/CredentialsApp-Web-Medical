import { Component, OnInit } from "@angular/core";
import { BarcodeFormat } from "@zxing/library";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  hash: string;
  allowedFormats = [];
  constructor() {}

  ngOnInit() {
    this.hash = history.state.data.registeredUser.hashWithoutPassword;
    this.allowedFormats = [
      BarcodeFormat.QR_CODE,
      BarcodeFormat.EAN_13,
      BarcodeFormat.CODE_128,
      BarcodeFormat.DATA_MATRIX /*, ...*/
    ];
  }
}
