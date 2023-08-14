import { Component, ViewChild } from "@angular/core";
import { IonTabs } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
})
export class TabsPage {
  activeTab: any = "/tabs/home";
  constructor(private router: Router) {}

  getSelectedTab() {
    this.activeTab = this.router.url;
  }
}
