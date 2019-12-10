import { Component, OnInit } from '@angular/core';
import { AmberService } from '../services/amber.service';
import { Amber } from '../types/amber';
import { AppService } from '../services/app.service';
import { App } from '../types/app';
import { UserService } from '../services/user.service';
import { DEVICE_TYPE } from '../constants';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss']
})
export class MainSectionComponent implements OnInit {
  firstPanelOpenState = false;
  secondPanelOpenState = false;
  thirdPanelOpenState = false;
  deviceType = Object.keys(DEVICE_TYPE);
  public amberInfo: Amber;
  public appInfo: App;
  public selectedUser: any;

  constructor(
    private amberService: AmberService,
    private appService: AppService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.currentUser.subscribe(user => {
      this.selectedUser = user;
      this.amberInfo = null;
      this.appInfo = null;
    });
    this.userService.userList.subscribe(users => {
      if (users) {
        this.firstPanelOpenState = true;
      }
    });
    this.amberService.amberInfo.subscribe((result: Amber) => {
      if (!result) {
        this.amberInfo = null;
        this.appInfo = null;
        return;
      }
      this.amberInfo = result;
      this.appInfo = null;
      this.expand();
    });

    this.appService.appInfo.subscribe((result: App) => {
      if (!result) {
        this.amberInfo = null;
        this.appInfo = null;
        return;
      }
      this.appInfo = result;
      this.amberInfo = null;
      this.expand();
    });
  }

  getPanelDetailTitle() {
    const { data } = this.selectedUser;
    const name = data ? data.first_name : '...';
    if (!this.amberInfo && !this.appInfo) {
      return 'Amber/App Details';
    } else if (this.amberInfo) {
      return `Amber for ${name}`;
    } else if (this.appInfo) {
      return `App for ${name}`;
    }
  }

  isSelectedUser() {
    return this.selectedUser && Object.keys(this.selectedUser).length;
  }

  isAmberInfoAvailable() {
    return this.amberInfo && Object.keys(this.amberInfo).length;
  }

  isAppInfoAvailable() {
    return this.appInfo && Object.keys(this.appInfo).length;
  }

  expand() {
    this.secondPanelOpenState = true;
    this.thirdPanelOpenState = true;
  }

}
