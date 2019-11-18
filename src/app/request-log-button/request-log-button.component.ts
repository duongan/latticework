import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-log-button',
  templateUrl: './request-log-button.component.html',
  styleUrls: ['./request-log-button.component.scss']
})
export class RequestLogButtonComponent implements OnInit {
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      ticketNumber: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

}
