import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nhs-number',
  templateUrl: './nhs-number.component.html',
  styleUrls: ['./nhs-number.component.scss']
})
export class NhsNumberComponent implements OnInit {

  constructor() { }

  @Input() disable: boolean = false;

  @Output() submit: EventEmitter<string> = new EventEmitter();
  @Output() tryAgain: EventEmitter<any> = new EventEmitter();

  nhsNumber: string = '';

  ngOnInit(): void {
  }

  onSubmit() {
    this.submit.emit(this.nhsNumber);
  }
}
