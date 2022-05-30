import { ValidatorFn, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export const onlyEntryLessExitDate = (): ValidatorFn => {
  return (formGroup: FormGroup) => {
    const entryDateControl = formGroup.get('entryDate');
    const exitDateControl = formGroup.get('exitDate');

    if (!entryDateControl || !exitDateControl) {
      return null;
    }

    if (!entryDateControl.value || !exitDateControl.value) {
      return null;
    }

    if(entryDateControl.value <= exitDateControl.value) {
      return null;
    } else {
      return { onlyEntryLessExitDate: true }
    }
  };
}

export class OnlyEntryLessExitDateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control.parent.invalid && form.submitted || (control.touched && (control.parent.hasError('onlyEntryLessExitDate') || control.invalid));
    }
}
