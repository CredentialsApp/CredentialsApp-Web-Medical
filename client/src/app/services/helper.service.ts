import { Injectable } from "@angular/core";
import { RecordModel } from "../models/recordModel";
@Injectable({
  providedIn: "root"
})
export class HelperService {
  constructor() {}

  stringDecode(str: string) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
      var hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join("");
  }

  getCanonicalUUID(uuid: string | number): string {
    if (typeof uuid === "number") uuid = uuid.toString(16);
    uuid = uuid.toLowerCase();
    if (uuid.length <= 8)
      uuid = ("00000000" + uuid).slice(-8) + "-0000-1000-8000-00805f9b34fb";
    if (uuid.length === 32)
      uuid = uuid
        .match(
          /^([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})$/
        )
        .splice(1)
        .join("-");
    return uuid;
  }

  setCredentialEditibleObject(credential: string, editedString: string){
    var multiplier = parseInt(credential.substring(60, 62));
    var newsub = (multiplier + 1) * 2 + 60;
    var staticString = credential.substring(0,newsub+2);
    return staticString + editedString + "02";
  }

  getCredentialObject(credential: string) {
    var multiplier = parseInt(credential.substring(60, 62));

    var newsub = (multiplier + 1) * 2 + 60;
    var last = credential.substring(newsub);

    var newMultiplier = parseInt(last.substring(0, 2));

    var lastString = last.substring(2, newMultiplier * 8 + 2);

    var lastArray = lastString.match(/.{1,2}/g);

    var recordArray = [];

    for (var i = 0; i < newMultiplier * 4; i += 4) {
      var recordObject = new RecordModel();
      recordObject.recordType = lastArray[i];
      recordObject.recordLenght = lastArray[i + 1];
      recordObject.record = lastArray[i + 2];
      recordObject.selection = lastArray[i + 3];
      recordArray.push(recordObject);
    }

    return recordArray;
  }
}
