import { Form } from 'mobx-react-form';
import { getDefaultValidations } from './validations';

export interface Hooks {
  onSuccess?: (form: Form) => any;
  onSubmit?: (form: Form) => any;
  onClear?: (form: Form) => any;
  onReset?: (form: Form) => any;
}

export interface Field {
  name: string;
  type?: string;
  rules?: string;
  options?: { [key: string]: any };
  value?: any;
  role?: string;
}

export abstract class BaseForm extends Form {
  // constructor(props: { fields?: any; hooks?: Hooks } = {}) {
  //   const { fields = [], hooks } = props;

  //   super({ fields }, { hooks });
  // }

  plugins() {
    return getDefaultValidations();
  }

  options() {
    return ({
      autoParseNumbers: true,
      validateOnChange: false,
      validateOnBlur: true,
      validationDebounceWait: 0,
      showErrorsOnReset: false,
    });
  }

  abstract setup(): FormSetup;
}