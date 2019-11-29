import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  public leftDetails: Array<any>;
  public rightDetails: Array<any>;
  @Input() profileInfo: any;
  @Input() deviceInfo: any;
  @Input() activityList: any;
  @Input() appProfileInfo: any;
  @Input() appActivityList: any;

  constructor() {
    this.leftDetails = [];
    this.rightDetails = [];
  }

  ngOnInit() {
    if (this.profileInfo) {
      this.leftDetails.push(
        ...[
          {
            label: 'Display name',
            value: this.profileInfo.display_name
          },
          {
            label: 'Model',
            value: this.deviceInfo.model_code
          },
          {
            label: 'Serial Number',
            value: this.deviceInfo.sn
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
        ]
      );

      this.rightDetails.push(
        ...[
          {
            label: 'Setup Info',
            value: this.profileInfo.install_time
          },
          {
            label: 'IP',
            value: this.profileInfo.ip_addr
          },
          {
            label: 'Assigned ID',
            value: this.profileInfo.assign_id
          },
          {
            label: 'GUID',
            value: this.deviceInfo.guid
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
        ]
      );
    } else if (this.appProfileInfo) {
      this.leftDetails.push({
        label: 'Display name',
        value: this.appProfileInfo.device_display_name
      });

      this.rightDetails.push({
        label: 'OS Version',
        value: this.appProfileInfo.os_version
      });
    }
  }
}
