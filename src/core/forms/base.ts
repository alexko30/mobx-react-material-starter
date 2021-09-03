import { Form } from 'mobx-react-form';
import { AppFormSetup } from './types';
import { getDefaultValidations } from './validations';

export abstract class BaseForm extends Form {
  // constructor(props: { fields?: unknown; hooks?: Hooks } = {}) {
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

  abstract setup(): AppFormSetup;
}