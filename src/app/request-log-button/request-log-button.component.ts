import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestLogService } from '../services/request-log.service';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { DEVICE_TYPE } from '../constants';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-request-log-button',
  templateUrl: './request-log-button.component.html',
  styleUrls: ['./request-log-button.component.scss']
})
export class RequestLogButtonComponent implements OnInit {
  public form: FormGroup;
  @Input() type: any;
  @Input() profile: any;
  userAccount: any;
  requesting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private requestLog: RequestLogService,
    private user: UserService,
    private auth: AuthenticationService,
    private dialog: MatDialog
    ) {}

  ngOnInit() {
    this.user.currentUser.subscribe(user => this.userAccount = user);
    this.form = this.formBuilder.group({
      ticketNumber: ['', Validators.required]
    });
  }

  get f() {
    return this.form.controls;
  }

  submit(popover: any) {
    if (!this.type) {
      return;
    }
    this.requesting = true;
    const { ticketNumber } = this.form.controls;
    const profileKey = DEVICE_TYPE[this.type] === DEVICE_TYPE[1] ? 'nas_profile_id' : 'app_profile_id';
    const loggedInUser = JSON.parse(this.auth.currentUserValue);
    const params = {
      ticket_num: ticketNumber.value,
      user_account: this.userAccount.email,
      supporter: loggedInUser.account,
      profile_id: this.profile[profileKey],
      authorization_type: 1
    };
    this.requestLog.requestLog(this.type, params).subscribe(
      response => {
        this.openDialog({ title: 'Notice', message: 'Request log successfully' });
        this.requesting = false;
        popover.close();
      },
      response => {
        this.openDialog({ title: 'Warning', message: 'Request log failed' });
        this.requesting = false;
        popover.close();
      }
    );
  }

  openDialog(data: any) {
    this.dialog.open(DialogComponent, {
      width: '350px',
      data
    });
  }
}
