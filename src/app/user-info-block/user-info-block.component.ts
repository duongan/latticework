import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-info-block',
  templateUrl: './user-info-block.component.html',
  styleUrls: ['./user-info-block.component.scss', '../user-search/user-search.component.scss']
})
export class UserInfoBlockComponent implements OnInit {

  @Input() label: string;
  @Input() value: string;
  constructor() { }

  ngOnInit() {
  }

}
