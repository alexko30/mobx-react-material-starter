import { AppField, AppForm } from '@core/forms/types';

export const scrollToInvalidField = (fieldName: string, container = document) => {
  const input = container.querySelector(`[data-scroll-id="${fieldName}"]`);

  input?.scrollIntoView();
};

export const getInvalidFields = (form: AppForm): Array<string> => {
  const retrieveFields = (fields: AppForm['fields']): Array<string> => {
    return Array.from(fields.values())
      .filter(({ hasError }) => hasError)
      .reduce<Array<string>>((acc, { name, fields: nestedFields }) => 
        nestedFields.size
          ? [...acc, ...retrieveFields(nestedFields)]
          : [...acc, name], 
        []
      );
  };

  return retrieveFields(form.fields);
};

export const deleteFields = (form: AppForm, fields: Array<string>) => {
  fields.forEach((field) => form.del(field));
};

export const getRequiredAsterisk = (options: { required?: boolean; field?: AppField }) => {
  const { required, field } = options;
  const requiredRule = 'required';
  const fieldCondition = field?.rules?.includes(requiredRule);

  if (required || fieldCondition) {
    return '*';
  }

  return '';
};