import { FormControl } from '@angular/forms';

export const IBAN_REGEX = /IT\d{2}[ ][a-zA-Z]\d{3}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{3}|IT\d{2}[a-zA-Z]\d{22}/;

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const ALPHA_NUMERIC_ONLY = /^([A-Za-z]|[0-9])+$/;

export function emailValidator(control: FormControl): { [s: string]: boolean } {
  if (control.value && !control.value.match(EMAIL_REGEX)) {
    return {invalidEmail: true};
  }
}

export function ibanValidator(control: FormControl): { [s: string]: boolean } {
  if (control.value && !control.value.match(IBAN_REGEX)) {
    return {invalidIban: true};
  }
}
