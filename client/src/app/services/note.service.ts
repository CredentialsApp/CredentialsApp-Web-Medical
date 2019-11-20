import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, retry, catchError } from "rxjs/operators";
import { Note } from "../models/noteModel";

@Injectable({
  providedIn: "root"
})
export class NoteService {
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

  getNoteList(): Observable<Array<Note>> {
    return this.http.get(this.baseurl + "/getAllNotes", this.httpOptions).pipe(
      map((data: Note[]) => {
        return data;
      }),
      catchError(error => {
        return throwError("Note not found!");
      })
    );
  }

  updateNote(note: Note): Observable<Note> {
    return this.http
      .put<Note>(this.baseurl + "/updateNote", note, this.httpOptions)
      .pipe(
        catchError(error => {
          return throwError("Note not update!");
        })
      );
  }
}
