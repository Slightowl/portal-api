import { Component, Input, OnInit } from '@angular/core';
import { FormRequest } from 'src/api/proms/proms.api';

@Component({
  selector: 'app-declined-form',
  templateUrl: './declined-form.component.html',
  styleUrls: ['./declined-form.component.scss']
})
export class DeclinedFormComponent implements OnInit {
  @Input() formRequest!: FormRequest;

  constructor() { }

  ngOnInit(): void {
  }

}
