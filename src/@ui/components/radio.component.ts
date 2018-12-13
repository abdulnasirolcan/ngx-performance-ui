import { Component, Input, forwardRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { uuid } from '../../@core/utils';

export const COMPONENT_NAME_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioComponent),
  multi: true,
};

@Component({
  selector: 'mn-radio',
  template: `
    <label [attr.for]="id" class="pure-radio {{ classes }}">
      <input
        [attr.id]="id"
        [attr.name]="name"
        [attr.value]="radioValue"
        [attr.checked]="value && value === radioValue"
        [disabled]="disabled"
        type="radio"
      />
      <ng-content></ng-content>
    </label>
  `,
  providers: [COMPONENT_NAME_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
})
export class RadioComponent implements ControlValueAccessor {
  @Input()
  classes: string;

  @Input()
  id: string = uuid();

  @Input()
  name: string = 'radio';

  @Input()
  radioValue: any;

  disabled: boolean;

  private _value: any;

  set value(value: any) {
    this._value = value;
    this.notifyValueChange();
  }

  get value(): any {
    return this._value;
  }

  onChange: (value) => {};
  onTouched: () => {};

  constructor() {}

  notifyValueChange(): void {
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  writeValue(obj: any): void {
    this._value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onClick() {
    console.log(this.value, this.radioValue);
    this.value = this.radioValue;
  }
}