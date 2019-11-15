import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestLogButtonComponent } from './request-log-button.component';

describe('RequestLogButtonComponent', () => {
  let component: RequestLogButtonComponent;
  let fixture: ComponentFixture<RequestLogButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestLogButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestLogButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
