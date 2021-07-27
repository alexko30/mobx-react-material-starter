export const ENTITY_NAME_COMMON_FIELDS = {
  name: 'string'
};

export const ENTITY_NAME_CREATE_FIELDS = {
  ...ENTITY_NAME_COMMON_FIELDS
};

export const ENTITY_NAME_UPDATE_FIELDS = {
  ...ENTITY_NAME_COMMON_FIELDS,
  type: 'type'
};

export const ENTITY_NAME_READ_FIELDS = {
  ...ENTITY_NAME_COMMON_FIELDS,
  id: 'id',
  type: 'type'
};