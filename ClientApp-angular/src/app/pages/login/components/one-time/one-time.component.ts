import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-one-time',
  templateUrl: './one-time.component.html',
  styleUrls: ['./one-time.component.scss']
})
export class OneTimeComponent implements OnInit {

  constructor() { }

  @Input() disable: boolean = false;
  @Input() viaSms: boolean = true;

  @Output() submit: EventEmitter<string> = new EventEmitter();
  @Output() tryAgain: EventEmitter<any> = new EventEmitter();

  code: string = '';
  instruction: string = '';

  ngOnInit(): void {
    this.instruction = this.viaSms
      ? 'to your mobile device'
      : 'to your registered email address'
  }

  onSubmit() {
    this.submit.emit(this.code);
  }

  onTryAgain(): void {
    this.tryAgain.emit();
  }
}
