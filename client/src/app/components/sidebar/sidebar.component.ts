import { Component, OnInit } from "@angular/core";

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: "/home", title: "Home", icon: "nc-bank", class: "" },
  {
    path: "/liveAccounts",
    title: "Live Accounts",
    icon: "nc-badge",
    class: ""
  },
  {
    path: "/verifyMedicalInfo",
    title: "Verify Medical Info",
    icon: "nc-single-02",
    class: ""
  },
  {
    path: "/reviewMyNotes",
    title: "Review My Notes",
    icon: "nc-paper",
    class: ""
  },
  {
    path: "/identifyPatient",
    title: "Identify Patient",
    icon: "nc-circle-10",
    class: ""
  },
  {
    path: "/updates",
    title: "Updates",
    icon: "nc-spaceship",
    class: ""
  },
  {
    path: "/addItem",
    title: "Add Item",
    icon: "nc-simple-add",
    class: ""
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
