import { Component, OnInit } from "@angular/core";
import { LogService } from "../../services/log.service";
import { Log } from "../../models/logModel";

@Component({
  selector: "app-updates",
  templateUrl: "./updates.component.html",
  styleUrls: ["./updates.component.scss"]
})
export class UpdatesComponent implements OnInit {
  logs: Array<Log>;
  constructor(private logService: LogService) {}

  ngOnInit() {
    this.getLogs();
  }

  getLogs(): any {
    this.logService.getLogs().subscribe(res => {
      this.logs = res;
      console.log(this.logs);
    });
  }
}
