import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgxPaginationModule } from 'ngx-pagination';

import { JwtInterceptor } from './helpers/jwt.intercepter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainSectionComponent } from './main-section/main-section.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { RequestLogButtonComponent } from './request-log-button/request-log-button.component';
import { LogComponent } from './log/log.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { DialogComponent } from './dialog/dialog.component';
import { ActivityEventsComponent } from './activity-events/activity-events.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    SidebarComponent,
    MainSectionComponent,
    UserHistoryComponent,
    LogComponent,
    RequestLogButtonComponent,
    DetailPageComponent,
    DialogComponent,
    ActivityEventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressSpinnerModule,
    DataTablesModule,
    MatDialogModule,
    BrowserAnimationsModule,
    OverlayModule,
    NgxPaginationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent
  ]
})
export class AppModule {}
