import { Component, OnInit } from '@angular/core';
import { AmberService } from '../services/amber.service';
import { Amber } from '../types/amber';
import { AppService } from '../services/app.service';
import { App } from '../types/app';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss']
})
export class MainSectionComponent implements OnInit {
  firstPanelOpenState = false;
  secondPanelOpenState = false;
  thirdPanelOpenState = false;
  public amberInfo: Amber;
  public appInfo: App;

  constructor(
    private amberService: AmberService,
    private appService: AppService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.currentUser.subscribe(() => {
      this.amberInfo = null;
      this.appInfo = null;
    });
    this.amberService.amberInfo.subscribe((result: Amber) => {
      if (!result) {
        this.amberInfo = null;
        this.appInfo = null;
        return;
      }
      this.amberInfo = result;
      this.appInfo = null;
    });

    this.appService.appInfo.subscribe((result: App) => {
      if (!result) {
        this.amberInfo = null;
        this.appInfo = null;
        return;
      }
      this.appInfo = result;
      this.amberInfo = null;
    });
  }
}
