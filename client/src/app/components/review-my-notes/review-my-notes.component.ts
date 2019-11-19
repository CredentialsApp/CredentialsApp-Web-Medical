import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { EditPreviewComponent } from "../../modals/edit-preview/edit-preview.component";

@Component({
  selector: "app-review-my-notes",
  templateUrl: "./review-my-notes.component.html",
  styleUrls: ["./review-my-notes.component.scss"]
})
export class ReviewMyNotesComponent implements OnInit {
  dataList: any[];
  dialogValue: string;
  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.dataList = [
      {
        img: "assets/img/default-avatar2.png",
        patient: "#patient1",
        added: "21 nov 2019",
        preview: "hello"
      },
      {
        img: "assets/img/default-avatar2.png",
        patient: "#patient2",
        added: "21 nov 2019",
        preview: "testtesttesttest"
      }
    ];
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
}
