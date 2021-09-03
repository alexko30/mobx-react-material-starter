import { AppField, AppForm } from '@core/forms/types';


export const getDefaultError = (error: { [key: string]: Array<unknown> } | string) => {
  const defaultMessage = 'Something went wrong';

  if (!error) {
    return defaultMessage;
  }

  if (typeof error === 'string') {
    return error;
  }

  const normalizedErrors = Object.values(error);
  
  if (typeof normalizedErrors[0] === 'string') {
    return normalizedErrors[0];
  } 

  return defaultMessage;
};

interface AppError {
  message: string;
  path: string;
}

export const retrieveValidationErrors = (errors: Array<AppError>) => {
  if (!errors) {
    return [];
  }

  return errors.map(({ message, path }) => {
    const normalizedFieldPath = path.replace(/[\[\]]{2}/g, '.').replace(/[\[\]]/g, '');

    return {
      message,
      field: normalizedFieldPath,
    };
  });
};

export const showErrors = (errorSource: Array<AppError> | string, form: AppForm) => {
  if (typeof errorSource === 'string') {
    // showNotification(getDefaultError(errorSource), NotificationType.error);

    return;
  }
  
  retrieveValidationErrors(errorSource).forEach((err) => {
    const fieldParts = err.field.split('.');

    const getField = (fields: Map<string, AppField>, fieldName: string): AppField | undefined => {
      const selectedField = fields.get(fieldName);

      if (!selectedField) {
        return undefined;
      }

      const currentFieldNameIndex = fieldParts.findIndex((x) => x === fieldName);
      const nextFieldName = fieldParts[currentFieldNameIndex + 1];
  
      if (selectedField.fields.size && nextFieldName) {
        return getField(selectedField.fields, nextFieldName);
      }
  
      return selectedField;
    };

    const fieldName = fieldParts[0];

    if (fieldName) {
      const field = getField(form.fields, fieldName);
  
      if (field) {
        field.errorAsync = err.message;
  
        field.showErrors();
      } else {
        // showNotification(err.message, NotificationType.error);
      }
    }
  });
};