import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-review-my-notes",
  templateUrl: "./review-my-notes.component.html",
  styleUrls: ["./review-my-notes.component.scss"]
})
export class ReviewMyNotesComponent implements OnInit {
  dataList: any[];
  constructor() {}

  ngOnInit() {
    this.dataList = [
      {
        img: "assets/img/default-avatar2.png",
        patient: "#patient1",
        added: "21 nov 2019",
        preview: "hello"
      }
    ];
  }
}
