import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, retry, catchError } from "rxjs/operators";
import { Log } from "../models/logModel";

@Injectable({
  providedIn: "root"
})
export class LogService {
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

  getLogs(): Observable<Array<Log>> {
    return this.http.get(this.baseurl + "/getAllLogs", this.httpOptions).pipe(
      map((data: Log[]) => {
        return data;
      }),
      catchError(error => {
        return throwError("Log not found!");
      })
    );
  }

  insertLog(log: Log): Observable<Log> {
    return this.http
      .post<Log>(this.baseurl + "/insertLog", log, this.httpOptions)
      .pipe(
        catchError(error => {
          return throwError("Log not create!");
        })
      );
  }
}
