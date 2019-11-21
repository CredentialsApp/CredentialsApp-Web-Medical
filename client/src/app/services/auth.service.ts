import { Injectable } from "@angular/core";
import { User } from "../models/userModel";
import * as CryptoJS from "crypto-js";
import * as secp256k1 from "secp256k1";
import { Buffer } from "buffer";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  privateSecret: string =
    "4107E215B2E4907348E67E4B77FA7CC0DF1897DB342316520DBA5ED9CB0E1C1B";
  randomHash: string = "ffffffff";
  constructor() {}

  encryption(user: User): any {
    var doctorNameHash = CryptoJS.SHA256(user.doctorName).toString(
      CryptoJS.enc.Hex
    );

    var clinicNameHash = CryptoJS.SHA256(user.clinicName).toString(
      CryptoJS.enc.Hex
    );

    var passwordHash = CryptoJS.SHA256(user.password).toString(
      CryptoJS.enc.Hex
    );

    var privateKeyHash =
      doctorNameHash + "ffffffff" + clinicNameHash + "ffffffff" + passwordHash;

    var privateKey = CryptoJS.HmacSHA256(
      privateKeyHash,
      this.privateSecret
    ).toString();

    var publicKey = secp256k1
      .publicKeyCreate(Buffer.alloc(32, privateKey, "base64"))
      .toString("base64");

    return publicKey;
  }
}
