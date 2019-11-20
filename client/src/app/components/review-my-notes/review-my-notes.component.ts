import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { EditPreviewComponent } from "../../modals/edit-preview/edit-preview.component";
import { NoteService } from "../../services/note.service";
import { Note } from "../../models/noteModel";

@Component({
  selector: "app-review-my-notes",
  templateUrl: "./review-my-notes.component.html",
  styleUrls: ["./review-my-notes.component.scss"]
})
export class ReviewMyNotesComponent implements OnInit {
  dataList: Array<Note>;
  dialogValue: string;
  constructor(public dialog: MatDialog, private noteService: NoteService) {}

  ngOnInit() {
    this.getNoteList();
  }

  editPreview(note): void {
    const dialogRef = this.dialog.open(EditPreviewComponent, {
      backdropClass: "custom-dialog-backdrop-class",
      data: { pageValue: note }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
    });
  }

  getNoteList(): any {
    this.noteService.getNoteList().subscribe(res => {
      this.dataList = res;
    });
  }
}
