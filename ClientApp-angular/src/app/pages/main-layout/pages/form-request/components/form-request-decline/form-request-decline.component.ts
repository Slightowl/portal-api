import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type OptionKeys = 'not-relevant' | 'not-known' | 'other';

type Option = {
  value: OptionKeys,
  description: string;
}

@Component({
  selector: 'app-form-request-decline',
  templateUrl: './form-request-decline.component.html',
  styleUrls: ['./form-request-decline.component.scss']
})
export class FormRequestDeclineComponent implements OnInit {

  constructor() { }

  @Input() disable: boolean = false;

  @Output() decline: EventEmitter<string> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() later: EventEmitter<any> = new EventEmitter();

  selectedReason?: Option;
  reason: string = '';

  options: Option[] = [
    {
      value: 'not-relevant',
      description: 'This is not relevant to me',
    },
    {
      value: 'not-known',
      description: 'I don\'t know why I received this',
    },
    {
      value: 'other',
      description: 'Other:',
    }
  ]

  ngOnInit(): void { }

  onDecline(): void {
    if(!this.selectedReason){
      return;
    }

    this.selectedReason.value === 'other'
      ? this.decline.emit(this.reason)
      : this.decline.emit(this.selectedReason.description);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onLater(): void {
    this.later.emit();
  }
}
