import { Component, Input, OnInit } from '@angular/core';
import { FormRequest } from 'src/api/proms/proms.api';

@Component({
  selector: 'app-completed-form',
  templateUrl: './completed-form.component.html',
  styleUrls: ['./completed-form.component.scss']
})
export class CompletedFormComponent implements OnInit {
  @Input() formRequest!: FormRequest;

  constructor() { }

  ngOnInit(): void {
  }
}
