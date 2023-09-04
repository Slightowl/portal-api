import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {
  constructor() { }

  @Input()
  set show(value: boolean) {
    if (value) {
      this.modal?.show();
    }
  }

  @Output() retry: EventEmitter<any> = new EventEmitter();

  private modal?: bootstrap.Modal;

  ngOnInit(): void {
    const modalEl = document.getElementById('error_modal');
    modalEl?.addEventListener('hidden.bs.modal', (event) => {
      this.onRetry();
    });

    this.modal = new bootstrap.Modal(modalEl as Element, {});
  }

  onRetry(): void {
    this.retry.emit();
  }
}
