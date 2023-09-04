import { Component, Input, OnInit } from '@angular/core';
import { FormRequest } from 'src/api/proms/proms.api';

@Component({
  selector: 'app-pending-form',
  templateUrl: './pending-form.component.html',
  styleUrls: ['./pending-form.component.scss']
})
export class PendingFormComponent implements OnInit {
  @Input() formRequest!: FormRequest;

  constructor() { }

  ngOnInit(): void {
  }

}
