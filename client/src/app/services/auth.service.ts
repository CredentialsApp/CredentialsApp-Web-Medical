import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { User } from "../models/userModel";

@Injectable({
  providedIn: "root"
})
export class AuthService {
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

  insertUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.baseurl + "/insertUser", user, this.httpOptions)
      .pipe(
        catchError(error => {
          return throwError("User not create!");
        })
      );
  }
}
