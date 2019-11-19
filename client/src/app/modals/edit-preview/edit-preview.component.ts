import { Component, Inject, Optional, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-edit-preview",
  templateUrl: "./edit-preview.component.html",
  styleUrls: ["./edit-preview.component.scss"]
})
export class EditPreviewComponent implements OnInit {
  fromPage: string;
  fromDialog: string;
  constructor(
    public dialogRef: MatDialogRef<EditPreviewComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fromPage = data.pageValue;
  }

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close({ event: "close", data: this.fromDialog });
  }
}
