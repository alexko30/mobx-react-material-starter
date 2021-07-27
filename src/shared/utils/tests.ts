const TEST_ATTR_NAME = 'data-test-id';

export const getTestAttr = (module: string, elementDescription: string, elementName: string) => {
  return { [TEST_ATTR_NAME]: `${module}-${elementDescription}-${elementName}` };
};

export const getScrollAttr = (fieldName: string) => ({ [TEST_ATTR_NAME]: fieldName });