import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { SideBar } from '../types/sidebar';

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
    private userService: UserService
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
        data: [],
        dataLength: 0,
        hideToggle: true
      },
      {
        name: 'App',
        icon: 'app',
        data: [],
        dataLength: 0,
        hideToggle: true
      },
      {
        name: 'Amber X',
        icon: 'amberX',
        data: [],
        dataLength: 0,
        hideToggle: true
      }
    ];
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => {
      if (!user) {
        return;
      }

      this.sidebarList[0].data = user.nas_list;
      this.sidebarList[0].dataLength = user.nas_list ? user.nas_list.length : 0;
      this.sidebarList[0].hideToggle = this.sidebarList[0].dataLength === 0;
      this.sidebarList[1].data = user.app_list;
      this.sidebarList[1].dataLength = user.app_list ? user.app_list.length : 0;
      this.sidebarList[1].hideToggle = this.sidebarList[1].dataLength === 0;
    });
  }
}
