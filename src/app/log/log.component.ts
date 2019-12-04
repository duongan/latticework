import { Component, OnInit, OnDestroy, Input, AfterViewInit, ViewChild, OnChanges, Inject, LOCALE_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { formatDate } from '@angular/common';
import { DataTableDirective } from 'angular-datatables';
import { DownloadService } from '../services/download.service';
import { AmberService } from '../services/amber.service';
import { AppService } from '../services/app.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @Input() amber: any;
  @Input() app: any;
  logList: Array<any>;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  loading: boolean = false;

  selectedLogs: any[] = [];
  requestStatus: any = {
    10: "Initialized",
    20: "Notification Sent",
    30: "Rejected",
    40: "Approved",
    50: "Uploading",
    60: "Upload Failed",
    70: "Upload Success"
  };

  constructor(
    private amberService: AmberService,
    private appService: AppService,
    private downloadService: DownloadService,
    private dialog: MatDialog,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  ngOnInit() {
    this.dtOptions = {
      columnDefs: [
        { orderable: false, targets: 2 }
      ]
    };
  }

  ngOnChanges() {
    this.logList = this.amber ? this.amber.logList : this.app.logList;
  }

  download() {
    if (!this.selectedLogs.length) {
      this.openDialog({ title: 'Warning', message: 'Please select a log that you want to download' });
      return;
    }
    if (this.selectedLogs.length > 1) {
      this.openDialog({ title: 'Warning', message: 'For now, we just support downloading one log at a time' });
      return;
    }
    if (this.selectedLogs.length === 1) {
      const { authorization_id, filename } = this.selectedLogs[0];
      this.downloadService.downloadLog(authorization_id)
        .subscribe(
          response => {
            const defaultFileName = `DebugLogfile-${formatDate(new Date(), 'yyyy-m-d h:mm:ss', this.locale)}`;
            const finalFileName = filename || defaultFileName;
            const blob = new Blob([response], { type: 'text/plain' });
            const file = new File([blob], `${finalFileName}.log`, { type: 'text/plain' });
            saveAs(file);
          },
          response => {
            this.openDialog({ title: 'Warning', message: 'Download failed!' });
          }
        );
    }
  }

  reloadLogs(): void {
    this.loading = true;
    if (this.amber) {
      this.amberService.getLogList(this.amber.profileInfo.nas_profile_id)
                .subscribe((logs: any) => {
                  this.loading = false;
                  this.logList = logs;
                });
    } else if (this.app) {
      this.appService.getLogList(this.app.profileInfo.app_profile_id)
              .subscribe((logs: any) => {
                this.loading = false;
                this.logList = logs;
              });
    }
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  selectLog(event: any, data: any): void {
    if (event.target.checked) {
      const existedItem = this.selectedLogs.find(item => item.authorization_id === data.authorization_id);
      if (!existedItem) {
        this.selectedLogs.push(data);
      }
    } else {
      const tmp = this.selectedLogs.filter(item => item.authorization_id !== data.authorization_id);
      this.selectedLogs = tmp;
    }
  }

  openDialog(data: any) {
    this.dialog.open(DialogComponent, {
      width: '350px',
      data
    });
  }

}
