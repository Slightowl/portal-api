import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login-error',
  templateUrl: './login-error.component.html',
  styleUrls: ['./login-error.component.scss']
})
export class LoginErrorComponent implements OnInit {

  constructor() { }

  @Output() back: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }

  onBack(): void {
    this.back.emit();
  }
}
