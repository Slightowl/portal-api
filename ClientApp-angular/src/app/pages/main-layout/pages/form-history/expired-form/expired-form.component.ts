import { Component, Input, OnInit } from '@angular/core';
import { FormRequest } from 'src/api/proms/proms.api';

@Component({
  selector: 'app-expired-form',
  templateUrl: './expired-form.component.html',
  styleUrls: ['./expired-form.component.scss']
})
export class ExpiredFormComponent implements OnInit {
  @Input() formRequest!: FormRequest;

  constructor() { }

  ngOnInit(): void {
  }

}
