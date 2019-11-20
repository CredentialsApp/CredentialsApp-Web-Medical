import { Component, Inject, Optional, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { NoteService } from "../../services/note.service";
import { Note } from "../../models/noteModel";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-preview",
  templateUrl: "./edit-preview.component.html",
  styleUrls: ["./edit-preview.component.scss"]
})
export class EditPreviewComponent implements OnInit {
  fromPage: string;
  fromDialog: string;
  noteData = new Note();
  constructor(
    private noteService: NoteService,
    private toastrService: ToastrService,
    public dialogRef: MatDialogRef<EditPreviewComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.noteData = data.pageValue;
  }

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close({ event: "close", data: this.fromDialog });
  }

  updateNote(): any {
    this.noteService.updateNote(this.noteData).subscribe(res => {
      this.toastrService.success("Note Updated Successfully");
      this.closeDialog();
    });
  }
}
