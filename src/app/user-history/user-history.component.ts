import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss']
})
export class UserHistoryComponent implements OnInit, OnDestroy {

  dataSource: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.dtOptions = {
      columnDefs: [
        { orderable: false, targets: 1 },
        { orderable: false, targets: 2 },
        { orderable: false, targets: 3 },
        { orderable: false, targets: 6 },
        { orderable: false, targets: 7 }
      ],
      paging: false,
      searching: false,
      info: false
    };
    this.auth.getUsers().subscribe(users => {
      this.dataSource = users;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

}
