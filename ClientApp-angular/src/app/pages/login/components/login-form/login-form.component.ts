import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroupDirective, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { asISODateOnlyString } from 'src/lib/utils/dates';

export type LoginFormFields = {
  surname: string;
  postcode: string;
  dateOfBirth: string;
};

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  @Input() disable: boolean = false;
  @Input() loginError: boolean = false;

  @Output() submit: EventEmitter<LoginFormFields> = new EventEmitter();

  private submissionAttempted: boolean = false;

  loginForm = this.formBuilder.group({
    surname: '',
    postcode: '',
    dobDay: ['', [Validators.min(1), Validators.max(31)]],
    dobMonth: ['', [Validators.min(1), Validators.max(12)]],
    dobYear: ['', [Validators.min(1900), Validators.max(new Date().getFullYear())]],
  });

  get surname() { return this.loginForm.get('surname'); }
  get postcode() { return this.loginForm.get('postcode'); }
  get dobDay() { return this.loginForm.get('dobDay'); }
  get dobMonth() { return this.loginForm.get('dobMonth'); }
  get dobYear() { return this.loginForm.get('dobYear'); }

  ngOnInit(): void {
  }

  isValid(field: AbstractControl | null): boolean {
    return field !== null && field.valid && field.dirty;
  }

  isInvalid(field: AbstractControl | null): boolean {
    return field !== null && field.invalid && (field.dirty || this.submissionAttempted);
  }

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.submissionAttempted = true;

    const form = <HTMLFormElement>event.target;

    if (!form.checkValidity() || this.loginForm.invalid) {
      return;
    }

    const dob = new Date(
      Number(this.dobYear?.value),
      Number(this.dobMonth?.value) - 1,
      Number(this.dobDay?.value),
    );  

    const e = {
      surname: this.surname?.value,
      postcode: this.postcode?.value,
      dateOfBirth: asISODateOnlyString(dob),
    };

    this.submit.emit(e);
  }

 
}
