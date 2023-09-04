import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.scss']
})
export class WarningModalComponent implements OnInit {

  constructor() { }

  @Input()
  set show(value: boolean) {
    if (value) {
      this.modal?.show();
    }
  }

  @Output() continue: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  private modal?: bootstrap.Modal;

  ngOnInit(): void {
    const modalEl = document.getElementById('warning_modal');
    this.modal = new bootstrap.Modal(modalEl as Element, {});
  }

  onContinue(): void {
    this.modal?.hide();
    this.continue.emit();
  }

  onCancel(): void {
    this.modal?.hide();
    this.cancel.emit();
  }
}
