import { Component, Input, OnInit, OnChanges, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { DEVICE_TYPE } from '../constants';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit, OnChanges {
  public leftDetails: Array<any>;
  public rightDetails: Array<any>;
  @Input() profileInfo: any;
  @Input() deviceInfo: any;
  @Input() activityList: any;
  @Input() appProfileInfo: any;
  @Input() appActivityList: any;
  @Input() type: any;
  profile: any;

  constructor(@Inject(LOCALE_ID) private locale: string) {
    this.leftDetails = [];
    this.rightDetails = [];
  }

  ngOnChanges() {
    this.initData();
  }

  ngOnInit() {
    
  }

  initData() {
    this.profile = this.profileInfo || this.appProfileInfo;
    if (this.profileInfo) {
      this.leftDetails = [
          {
            label: 'Display name',
            value: this.getInfo('profileInfo', 'display_name')
          },
          {
            label: 'Model',
            value: this.getInfo('deviceInfo', 'model_code')
          },
          {
            label: 'Serial Number',
            value: this.getInfo('deviceInfo', 'sn')
          },
          {
            label: 'Router board ID',
            value: ''
          },
          {
            label: 'Router FW Version',
            value: ''
          },
          {
            label: 'Default Password',
            value: ''
          },
          {
            label: 'WAN Mac',
            value: ''
          },
          {
            label: '2.4G MAC',
            value: ''
          }
      ];

      this.rightDetails = [
          {
            label: 'Setup Info',
            value: formatDate(this.getInfo('profileInfo', 'install_time'), 'd MMM y @ h:mm:ss a (zzzz)', this.locale)
          },
          {
            label: 'IP',
            value: this.getInfo('profileInfo', 'ip_addr')
          },
          {
            label: 'Assigned ID',
            value: this.getInfo('profileInfo', 'assign_id')
          },
          {
            label: 'GUID',
            value: this.getInfo('deviceInfo', 'guid')
          },
          {
            label: 'Mainboard ID',
            value: ''
          },
          {
            label: 'Wifi SSID',
            value: ''
          },
          {
            label: '5G Mac',
            value: ''
          }
      ];
    } else if (this.appProfileInfo) {
      this.leftDetails.push({
        label: 'Display name',
        value: this.getInfo('appProfileInfo', 'device_display_name')
      });

      this.rightDetails.push({
        label: 'OS Version',
        value: this.getInfo('appProfileInfo', 'os_version')
      });
    }
  }

  getInfo(type: string, field: string): string {
    if (this[type] && this[type][field]) {
      return this[type][field];
    }
    return '';
  }
}
