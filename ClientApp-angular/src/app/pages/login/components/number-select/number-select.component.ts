import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-number-select',
  templateUrl: './number-select.component.html',
  styleUrls: ['./number-select.component.scss']
})
export class NumberSelectComponent implements OnInit {

  constructor() { }

  @Input() numbers: string[] = [];
  @Input() disable: boolean = false;

  @Output() submit: EventEmitter<string> = new EventEmitter();

  canSendCode: boolean = false;

  private selectedNumber: string = '';

  ngOnInit(): void {
    this.numbers.sort(() => 0.5 - Math.random());
  }

  onPhoneSelected(number: string) {
    this.selectedNumber = number;
    this.canSendCode = true;
  }

  onSendCode() {
    this.submit.emit(this.selectedNumber);
  }
}
