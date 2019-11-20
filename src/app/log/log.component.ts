import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit, OnDestroy {

  dataSource: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.dtOptions = {
      columnDefs: [
        { orderable: false, targets: 2 }
      ]
    };
    this.auth.getLogs().subscribe(logs => {
      this.dataSource = logs;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

}
