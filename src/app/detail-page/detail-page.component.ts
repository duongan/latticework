import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  public leftDetails: any;
  public rightDetails: any;

  constructor() {
    this.leftDetails = [
      {
        label: 'Display name',
        value: 'Amber for Frank'
      },
      {
        label: 'Model',
        value: 'AM1121'
      },
      {
        label: 'Serial Number',
        value: '1234567'
      },
      {
        label: 'Router board ID',
        value: '1234567'
      },
      {
        label: 'Router FW Version',
        value: '11.25.12'
      },
      {
        label: 'Default Password',
        value: 'Password'
      },
      {
        label: 'WAN Mac',
        value: '01 f4 tg h4 11'
      },
      {
        label: '2.4G MAC',
        value: '192.0.1.2'
      }
    ];

    this.rightDetails = [
      {
        label: 'Setup Info',
        value: '28 Sep 2018 @ 6:22:45 (GMT -7:00)'
      },
      {
        label: 'IP',
        value: '192.1.2.2'
      },
      {
        label: 'Assigned ID',
        value: 'xxxxxxxx'
      },
      {
        label: 'GUID',
        value: '2345tgf45'
      },
      {
        label: 'Mainboard ID',
        value: 'AM112121'
      },
      {
        label: 'Wifi SSID',
        value: 'Frank 123'
      },
      {
        label: '5G Mac',
        value: 'AM12321'
      },
      {
        label: 'OS Version',
        value: '11.1'
      }
    ];
  }

  ngOnInit() {}
}
