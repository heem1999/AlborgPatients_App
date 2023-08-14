import { UtilService } from "./../../services/util.service";
import { ApiService } from "./../../services/api.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-privacy-policy",
  templateUrl: "./privacy-policy.page.html",
  styleUrls: ["./privacy-policy.page.scss"],
})
export class PrivacyPolicyPage implements OnInit {
  data: any = {};
  err: any = {};
  lan: string;
  constructor(private api: ApiService, private util: UtilService) {
    this.lan=localStorage.getItem("Language");
    this.util.startLoad();
    this.api.getDataWithToken("privacy").subscribe(
      (res: any) => {
        if (res.success) {
          this.util.dismissLoader();
          this.data = res.data;
        }
      },
      (err) => {
        this.util.dismissLoader();
        this.err = err.error.errors;
      }
    );
  }

  ngOnInit() {}
}
