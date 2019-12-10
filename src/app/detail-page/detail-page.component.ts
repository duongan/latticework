import { Component, Input, OnChanges, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnChanges {
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

  initData() {
    this.profile = this.profileInfo || this.appProfileInfo;
    if (this.profileInfo) {
      const route = this.getInfo('deviceInfo', 'route');
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
            value: route && route.r_sn ? route.r_sn : ''
          },
          {
            label: 'Router FW Version',
            value: ''
          },
          {
            label: 'Default Password',
            value: route && route.default_wifi_pwd ? route.default_wifi_pwd : ''
          },
          {
            label: 'WAN Mac',
            value: route && route.r_wan_mac ? route.r_wan_mac : ''
          },
          {
            label: '2.4G MAC',
            value: route && route.wifi_2g_mac ? route.wifi_2g_mac : ''
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
            value: route && route.wifi_5g_mac ? route.wifi_5g_mac : ''
          }
      ];
    } else if (this.appProfileInfo) {
      this.leftDetails = [{
        label: 'Display name',
        value: this.getInfo('appProfileInfo', 'device_display_name')
      }];

      this.rightDetails = [{
        label: 'OS Version',
        value: this.getInfo('appProfileInfo', 'os_version')
      }];
    }
  }

  getInfo(type: string, field: string): any {
    if (this[type] && this[type][field]) {
      return this[type][field];
    }
    return null;
  }
}
