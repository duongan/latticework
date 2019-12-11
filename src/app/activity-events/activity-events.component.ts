import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AmberService } from '../services/amber.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-activity-events',
  templateUrl: './activity-events.component.html',
  styleUrls: ['./activity-events.component.scss'],
})
export class ActivityEventsComponent implements OnInit, OnChanges {

  @Input('data') activities: any[] = [];
  @Input() profile: any;
  asyncActivities: Observable<any[]>;
  p: number = 1;
  perPage: number = 5;
  total: number = 0;
  loading: boolean = false;
  service: any;
  profileId: string;

  constructor(
    private amberService: AmberService,
    private appService: AppService
  ) { }

  ngOnChanges() {
    if (this.profile) {
      if (this.profile.nas_profile_id) {
        this.profileId = this.profile.nas_profile_id;
        this.service = this.amberService;
      } else if (this.profile.app_profile_id) {
        this.profileId = this.profile.app_profile_id
        this.service = this.appService;
      }
    }
    this.getPage(1);
  }

  ngOnInit() {
    
  }

  getPage(page: number) {
    this.loading = true;
    const offset = (page - 1) * this.perPage;
    this.asyncActivities = this.service.getActivityEventList(this.profileId, offset, this.perPage)
      .pipe(
        tap((res: any) => {
          this.p = page;
          this.loading = false;
          if (!res) {
            this.total = 0;
          } else {
            this.total = res.total;
          }
          
        }),
        map((res: any) => {
          this.loading = false;
          if (!res) {
            return [];
          }
          return res.data;
        })
      );
  }

}
