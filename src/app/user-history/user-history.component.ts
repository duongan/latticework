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

  constructor(private auth: AuthenticationService) {}

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

    this.dataSource = [
      {
        id: 1,
        name: 'Chantel Cruz',
        email: 'Chantel.Cruz@gmai.com',
        language: 'English',
        status: 'Active',
        lastServiceDate: Date.now(),
        registeredTime: Date.now()
      },
      {
        id: 2,
        name: 'Allan Fitzgerald',
        email: 'Allan.Fitzgerald@gmai.com',
        language: 'English',
        status: 'In Active',
        lastServiceDate: Date.now(),
        registeredTime: Date.now()
      },
      {
        id: 3,
        name: 'Martine Fletcher',
        email: 'Martine.Fletcher@gmai.com',
        language: 'English',
        status: 'Active',
        lastServiceDate: Date.now(),
        registeredTime: Date.now()
      },
      {
        id: 4,
        name: 'Chantel Cruz',
        email: 'Chantel.Cruz@gmai.com',
        language: 'English',
        status: 'Active',
        lastServiceDate: Date.now(),
        registeredTime: Date.now()
      },
      {
        id: 5,
        name: 'Allan Fitzgerald',
        email: 'Allan.Fitzgerald@gmai.com',
        language: 'English',
        status: 'In Active',
        lastServiceDate: Date.now(),
        registeredTime: Date.now()
      },
      {
        id: 6,
        name: 'Martine Fletcher',
        email: 'Martine.Fletcher@gmai.com',
        language: 'English',
        status: 'Active',
        lastServiceDate: Date.now(),
        registeredTime: Date.now()
      },
      {
        id: 7,
        name: 'Allan Fitzgerald',
        email: 'Allan.Fitzgerald@gmai.com',
        language: 'English',
        status: 'In Active',
        lastServiceDate: Date.now(),
        registeredTime: Date.now()
      },
      {
        id: 8,
        name: 'Martine Fletcher',
        email: 'Martine.Fletcher@gmai.com',
        language: 'English',
        status: 'Active',
        lastServiceDate: Date.now(),
        registeredTime: Date.now()
      }
    ];
    this.dtTrigger.next();
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }
}
