import { Component, OnInit, Input } from '@angular/core';
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
  @Input() ngClass: any;
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
    setTimeout(() => {
      this.userService.currentUser.subscribe(user => {
        if (!user) {
          return;
        }
        this.sidebarList[0].data = user.nas_list;
        this.sidebarList[1].data = user.app_list;
      });
    });
  }

  getDetailInfo(event: any, item: any, currentApp: any) {
    event.preventDefault();
    const selected = this.userService.getSelectedSideBarItem();
    if (currentApp.name === 'Amber' && selected !== item.nas_profile_id) {
      this.amberService.getAmberInfo(item.nas_profile_id, item.assign_id);
      this.userService.setSelectedSideBarItem(item.nas_profile_id);
    } else if (currentApp.name === 'App' && selected !== item.app_profile_id) {
      this.appService.getAppInfo(item.app_profile_id);
      this.userService.setSelectedSideBarItem(item.app_profile_id);
    }
  }

  isSelectedItem(data: any, type: any) {
    let profileId = null;
    if (type.name === 'Amber') {
      profileId = data.nas_profile_id;
    } else if (type.name === 'App') {
      profileId = data.app_profile_id;
    }
    return this.userService.getSelectedSideBarItem() === profileId;
  }
}
