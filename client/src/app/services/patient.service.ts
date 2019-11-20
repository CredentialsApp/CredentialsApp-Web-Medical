import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, retry, catchError } from "rxjs/operators";
import { Patient } from "../models/patientModel";

@Injectable({
  providedIn: "root"
})
export class PatientService {
  // Base url
  baseurl = "http://localhost:4201/api";

  constructor(private http: HttpClient) {}

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
      //   MyClientCert: "", // This is empty
      //   MyToken: "" // This is empty
    })
  };

  getPatientList(): Observable<Array<Patient>> {
    return this.http
      .get(this.baseurl + "/getAllPatients", this.httpOptions)
      .pipe(
        map((data: Patient[]) => {
          return data;
        }),
        catchError(error => {
          return throwError("Capital not found!");
        })
      );
  }
}
