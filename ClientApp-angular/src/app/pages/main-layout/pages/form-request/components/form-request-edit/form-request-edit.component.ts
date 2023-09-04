import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-request-edit',
  templateUrl: './form-request-edit.component.html',
  styleUrls: ['./form-request-edit.component.scss']
})
export class FormRequestEditComponent implements OnInit {
  constructor() { }

  @Input() formName: string = '';
  @Input() compositionId: string = '';

  ngOnInit(): void {}
}
