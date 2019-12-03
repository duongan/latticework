import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { UserService } from '../services/user.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss']
})
export class UserHistoryComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  dataSource: any[] = [];
  selectedUser: any;
  userListSubscription: any;
  currentUserSubscription: any;

  constructor(
    private userService: UserService,
    private utils: UtilsService  
  ) { }

  ngOnInit() {
    this.dtOptions = {
      searching: false,
      columnDefs: [
        { orderable: false, targets: 6 },
        { orderable: false, targets: 7 }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          $(row).parent().children().css('background-color', '#ffffff');
          $(row).css('background-color', '#cccccc');
          this.userService.getUserDetail(data[2]);
        });
      },
      createdRow: (row: any, data: any) => {
        $(row).css({'cursor': 'pointer', 'background-color': '#ffffff'});
        if (this.selectedUser && this.selectedUser.email === data[2]) {
          $(row).css('background-color', '#cccccc');
        }
      }
    };

    this.userListSubscription = this.userService.userList.subscribe(users => {
      this.dataSource = users;
      this.rerenderTable();
    });

    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      if (user) {
        this.selectedUser = user;
      }
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy() {
    this.userListSubscription.unsubscribe();
    this.currentUserSubscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  rerenderTable(): void {
    if (!this.dtElement || !this.dtElement.dtInstance) {
      return;
    }
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  getLanguageName(code: string): void {
    return this.utils.getLanguageName(code);
  }
}
