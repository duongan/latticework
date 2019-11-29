import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { UserService } from '../services/user.service';
import { SideBar } from '../types/sidebar';
import { AmberService } from '../services/amber.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public sidebarList: SideBar[];

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private amberService: AmberService,
    private appService: AppService
  ) {
    iconRegistry.addSvgIcon(
      'amber',
      sanitizer.bypassSecurityTrustResourceUrl('assets/Amber.svg')
    );
    iconRegistry.addSvgIcon(
      'app',
      sanitizer.bypassSecurityTrustResourceUrl('assets/App.svg')
    );
    iconRegistry.addSvgIcon(
      'amberX',
      sanitizer.bypassSecurityTrustResourceUrl('assets/Amber x.svg')
    );
    this.sidebarList = [
      {
        name: 'Amber',
        icon: 'amber',
        data: []
      },
      {
        name: 'App',
        icon: 'app',
        data: []
      },
      {
        name: 'Amber X',
        icon: 'amberX',
        data: []
      }
    ];
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => {
      if (!user) {
        return;
      }

      this.sidebarList[0].data = user.nas_list;
      this.sidebarList[1].data = user.app_list;
    });
  }

  getDetailInfo(event: any, item: any, currentApp: any) {
    event.preventDefault();
    if (currentApp.name === 'Amber') {
      this.amberService.getAmberInfo(item.nas_profile_id, item.assign_id);
    } else if (currentApp.name === 'App') {
      this.appService.getAppInfo(item.app_profile_id);
    }
  }
}
