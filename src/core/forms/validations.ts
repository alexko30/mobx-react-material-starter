import validatorjs, { ValidatorStatic } from 'validatorjs';
import { Form } from 'mobx-react-form';

export interface Validation {
  function: (value: any, attribute?: string) => boolean;
  message: string;
}

export const validationRegExpr = {
  oneLowerCase: /[a-z]/,
  oneUpperCase: /[A-Z]/,
  oneDigital: /[0-9]/,
  specialChar: /[!@#$%^&*()+=_\-{}\[\]|:;“’?/<>,.]/,
  specialAndDigitChar: /[0-9!@#$%^&*()+=_\-{}\[\]|:;“’?/<>,.]/,
  minimumLength: /^.{7,}$/,
  whiteSpace: /^(?![\s]).*[\S]+$/
};

function createValidations<ClassKey extends string>(
  x: Record<ClassKey, Validation>
) {
  return x;
}

export const baseValidations = createValidations({
  passwordStrength: {
    function(value) {
      const formatValidators = [
        validationRegExpr.oneLowerCase,
        validationRegExpr.oneUpperCase,
        validationRegExpr.oneDigital,
        validationRegExpr.specialChar,
        validationRegExpr.minimumLength,
        validationRegExpr.whiteSpace
      ];

      return formatValidators.every((rule) => rule.test(value));
    },
    message: 'Invalid password format.'
  },
  whiteSpace: {
    function(value) {

      return validationRegExpr.whiteSpace.test(value);
    },
    message: 'Please remove blank space'
  },
  samePass: {
    function(value, attribute) {
      if (attribute) {
        const newValue = (this as unknown as Form).validator.input[attribute];
  
        return newValue === value;
      }

      return false;
    },
    message: 'Passwords do not match.',
  },
  array: {
    function(value) {
      return Boolean(value.length);
    },
    message: 'This field is required.'
  },
  number: {
    function(value) {
      return !isNaN(Number(value));
    },
    message: 'Invalid number format.'
  },
  positive: {
    function(value) {
      return Number(value) > 0;
    },
    message: 'This field should be positive.'
  },
  integer: {
    function(value) {
      return Number.isInteger(Number(value));
    },
    message: 'This field should be integer.'
  },

});

export function getDefaultValidations(customValidations?: { [key: string]: Validation }) {
  const rules: { [key: string]: Validation } = {
    ...baseValidations,
    ...customValidations,
  };

  return {
    dvr: {
      package: validatorjs,
      extend: (validator: ValidatorStatic) => {
        Object.keys(rules).forEach((key) => {
          const config = rules[key];

          if (config) {
            validator.register(key, config.function, config.message)
          }
        });

        const messages = validatorjs.getMessages('en');

        messages.max = 'This value is too long. It should have :max characters or less.';

        validator.setMessages('en', messages);
      }
    }
  };
}