import { Injectable } from "@angular/core";
import { User } from "../models/userModel";
import * as CryptoJS from "crypto-js";
import * as secp256k1 from "secp256k1";
import { Buffer } from "buffer";
import {HelperService} from "../services/helper.service";

@Injectable({
  providedIn: "root"
})
export class CryptologyService {
  privateSecret: string =
    "4107E215B2E4907348E67E4B77FA7CC0DF1897DB342316520DBA5ED9CB0E1C1B";
  randomHex: string = "ffffffff";
  constructor(private helperService : HelperService) {}

  encryption(user: User): any {
    var doctorNameHex = this.helperService.stringDecode(user.doctorName);

    var clinicNameHex = this.helperService.stringDecode(user.clinicName);

    var passwordHex = this.helperService.stringDecode(user.password);

    var privateKeyHex =
    doctorNameHex + this.randomHex + clinicNameHex + this.randomHex + passwordHex;

    var privateKey = CryptoJS.HmacSHA256(
      privateKeyHex,
      this.privateSecret
    ).toString();

    var publicKey = secp256k1
      .publicKeyCreate(Buffer.alloc(32, privateKey, "base64"))
      .toString("base64");

    user.doctorNameHex = doctorNameHex;
    user.publicKey = publicKey;
    user.privateKey = privateKey;
    return user;
  }

}
