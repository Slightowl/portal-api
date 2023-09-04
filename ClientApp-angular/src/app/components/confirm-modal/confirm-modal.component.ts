import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as bootstrap from 'bootstrap';

export interface ConfirmModalResult {
  ok: boolean;
}

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  constructor() { }

  @Input() question: string = 'Are you sure?';
  @Input() okButton: string = 'Yes';
  @Input() cancelButton: string = 'Cancel';

  @Input()
  set show(value: boolean) {
    if (value) {
      this.modal?.show();
    }
  }

  @Output() close: EventEmitter<ConfirmModalResult> = new EventEmitter();

  private modal?: bootstrap.Modal;
  private isOkResult: boolean = false;

  ngOnInit(): void {
    const modalEl = document.getElementById('success_modal');
    modalEl?.addEventListener('hidden.bs.modal', (event) => {
      this.onClose();
    });

    this.modal = new bootstrap.Modal(modalEl as Element, {});
  }

  onResult(ok: boolean): void {
    this.isOkResult = ok;
    this.modal?.hide();
  }

  private onClose(): void {
    this.close.emit({ ok: this.isOkResult });
  }
}
