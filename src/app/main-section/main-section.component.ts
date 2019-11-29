import { Component, OnInit } from '@angular/core';
import { AmberService } from '../services/amber.service';
import { Amber } from '../types/amber';
import { AppService } from '../services/app.service';
import { App } from '../types/app';

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
  public showDetailPanel = false;

  constructor(
    private amberService: AmberService,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.amberService.amberInfo.subscribe((result: Amber) => {
      if (!result) {
        return;
      }
      this.showDetailPanel = true;
      this.amberInfo = result;
      this.appInfo = null;
    });

    this.appService.appInfo.subscribe((result: App) => {
      if (!result) {
        return;
      }
      this.showDetailPanel = true;
      this.appInfo = result;
      this.amberInfo = null;
    });
  }
}
