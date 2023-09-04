import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-request-options',
  templateUrl: './form-request-options.component.html',
  styleUrls: ['./form-request-options.component.scss']
})
export class FormRequestOptionsComponent implements OnInit {
  constructor(private router: Router) { }

  @Input() formName: string = '';

  @Output() continue: EventEmitter<any> = new EventEmitter();
  @Output() later: EventEmitter<any> = new EventEmitter();
  @Output() decline: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void { }

  onContinue(): void {
    this.continue.emit();
  }

  onLater(): void {
    this.later.emit();
  }

  onDecline(): void {
    this.decline.emit();
  }
}
