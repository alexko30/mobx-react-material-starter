module 'mobx-react-form' {
  export abstract class Form {
    constructor(props?: FormConfig);
    protected abstract setup(): FormSetup;
    get hasError(): boolean;
    $: (fieldName: string) => Field;
    values: <T = Json>() => T;
    validate: () => Promise<void>;
    showErrors: () => void;
    update: (data: { [key: string]: any }) => void;
    reset: () => void;
    del: (fieldName: string) => void;
    validator;
    fields: Map<string, Field>;
  }

  export interface Hooks {
    onSuccess?: (form: Form) => void;
    onSubmit?: (form: Form) => void;
    onClear?: (form: Form) => void;
    onReset?: (form: Form) => void;
  }

  export interface FormEntityOptions {
    fallback?: boolean;
    defaultGenericError?: string;
    submitThrowsError?: boolean;
    showErrorsOnInit?: boolean;
    showErrorsOnSubmit?: boolean;
    showErrorsOnBlur?: boolean;
    showErrorsOnChange?: boolean;
    showErrorsOnClear?: boolean;
    showErrorsOnReset?: boolean;
    validateOnInit?: boolean;
    validateOnBlur?: boolean;
    validateOnChange?: boolean;
    validateOnChangeAfterSubmit?: boolean;
    validateOnChangeAfterInitialBlur?: boolean;
    validateDeletedFields?: boolean;
    validateDisabledFields?: boolean;
    validatePristineFields?: boolean;
    strictUpdate?: boolean;
    strictDelete?: boolean;
    softDelete?: boolean;
    retrieveOnlyDirtyValues?: boolean;
    retrieveOnlyEnabledFields?: boolean;
    autoParseNumbers?: boolean;
    validationDebounceWait?: number;
    validationDebounceOptions?: {
      leading: boolean;
      trailing: boolean;
    };
    allowRequired?: boolean;
  }
  
  export interface FieldConfig<T> {
    name: string;
    type?: string;
    rules?: string;
    options?: FormEntityOptions;
    value?: T;
    role?: string;
    fields?: Array<FieldConfig>;
  }

  type FieldUpdateProperty = 'value' | 'rules';

  export interface FieldBindings {
    autoFocus: Field['autoFocus'];
    id: Field['id'];
    name: Field['name'];
    disabled: Field['disabled'];
    label: Field['label'];
    value: Field['value'];
    placeholder: Field['placeholder'];
    type: Field['type'];
    onChange: Field['onChange'];
    onBlur: Field['onBlur'];
    onFocus: Field['onFocus'];
  }

  export interface Field<T = unknown> {
    autoFocus: boolean;
    error: string;
    errorAsync?: string;
    fields: Map<string, Field>;
    hasError: boolean;
    id: string;
    name: string;
    options: FormEntityOptions;
    role: string;
    rules: string;
    type: string;
    value: T;
    bind: () => FieldBindings;
    onBlur: (e) => void;
    onChange: (e) => void;
    onFocus: (e) => void;
    set: <K>(property: FieldUpdateProperty, value: K) => void;
    validate: () => Promise<void>;
    reset: () => any;
    resetValidation: () => any;
    container: () => Form;
    showErrors: () => void;
    $: (fieldName: string) => Field;
  }
  
  export interface FormSetup {
    fields: Array<FieldConfig>;
  }
  
  export interface FormConfig {
    fields?: Array<FieldConfig>; 
    hooks?: Hooks;
  }
}