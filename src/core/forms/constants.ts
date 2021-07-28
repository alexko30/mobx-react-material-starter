import { baseValidations } from './validations';

const BASE_FORM_RULES = {
  required: 'required',
  max: 'max',
  min: 'min',
  password: 'password',
  array: 'array'
};

const customValidationsKeys = Object.keys(baseValidations).reduce((acc, validationName) => ({
  ...acc,
  [validationName]: validationName,
}), {}) as Record<keyof typeof baseValidations, string>;

export const FORM_VALIDATIONS = {
  ...BASE_FORM_RULES,
  ...customValidationsKeys
};