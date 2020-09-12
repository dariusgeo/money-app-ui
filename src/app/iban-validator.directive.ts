import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[iban][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => IbanValidator), multi: true }]
})
export class IbanValidator implements Validator {

  constructor() {
  }

  validate(control: AbstractControl): { [key: string]: any } {
    let value = control.value;
    if (!value) {
      return null;
    }

    let parsedValue: string = String(value);
    let invalid: boolean = false;

    // iban should be at least 15 characters long
    if (parsedValue.length < 15) {
      return { invalidIban: true };
    }

    // test for illegal characters
    let regexp = new RegExp("^[a-zA-Z0-9]+$");
    if (regexp.test(parsedValue) == false) {
      return { invalidIban: true };
    }

    // move the first four characters to the back and make sure everything is uppercase
    parsedValue = (parsedValue.substr(4) + parsedValue.substr(0, 4)).toUpperCase();
    let valueWithConvertedNumbers: string = "";
    for (var i = 0; i < parsedValue.length; i++) {
      let character: number = parsedValue.charCodeAt(i);

      // If the character is A-Z, we need to convert it to a number from 10-35
      if (character > 64 && character < 91) {
        valueWithConvertedNumbers += String(character - 55);
      }
      else {
        valueWithConvertedNumbers += String.fromCharCode(character);
      }
    }

    let modulo = this.modulo(valueWithConvertedNumbers, 97);
    if (modulo !== 1) {
      return { invalidIban: true };
    }

    return null;
  }

  // Modulo of large numbers
  // See https://stackoverflow.com/questions/929910/modulo-in-javascript-large-number
  modulo(divident, divisor): number {
    let partLength = 10;

    while (divident.length > partLength) {
      var part = divident.substring(0, partLength);
      divident = (part % divisor) + divident.substring(partLength);
    }

    return divident % divisor;
  }
}
