import {
  getSchemaConstantValue,
  isNullableSchemaType,
  isSelect,
  pickSchemaType,
  typeOfSchema,
  type Merger,
  type Validator
} from '@sjsf/form/core';
import { DEFAULT_BOOLEAN_ENUM, type Schema, type UiSchemaRoot } from '@sjsf/form';

import type { EntriesConverter } from './entry.js';

export interface FormDataConverterOptions {
  validator: Validator;
  merger: Merger;
  rootSchema: Schema;
  rootUiSchema: UiSchemaRoot;
}

export function makeFormDataEntriesConverter({
  validator,
  merger,
  rootSchema,
  rootUiSchema
}: FormDataConverterOptions): EntriesConverter<string> {
  return ({ entries, schema, uiSchema }) => {
    if (typeof schema === 'boolean') {
      return schema ? entries[0]?.[1] : undefined;
    }
    const typeOrTypes = typeOfSchema(schema);
    const type = Array.isArray(typeOrTypes) ? pickSchemaType(typeOrTypes) : typeOrTypes;
    if (entries.length === 0) {
      if (type === 'boolean') {
        return false;
      }
      return isNullableSchemaType(typeOrTypes) ? null : undefined;
    }
    const value = entries[0][1];
    if (isSelect(validator, merger, schema, rootSchema)) {
      const altSchemas = schema.oneOf ?? schema.anyOf;
      const options = Array.isArray(altSchemas)
        ? altSchemas.map((s) => (typeof s === 'boolean' ? s : getSchemaConstantValue(s)))
        : (schema.enum ?? (type === 'boolean' ? DEFAULT_BOOLEAN_ENUM : undefined));
      if (options === undefined) {
        throw new Error(`Invalid select options: ${JSON.stringify(schema)}`);
      }
      const num = Number(value);
      if (Number.isInteger(num) && num >= 0 && num < options.length) {
        return structuredClone(options[num]);
      }
      if (options.includes(value)) {
        return value;
      }
      throw new Error(`Value "${value}" does not match the schema: ${JSON.stringify(schema)}`);
    }
    switch (type) {
      case 'string':
        if (value === '') {
          return schema.default === '' ||
            uiSchema['ui:options']?.stringEmptyValue === '' ||
            rootUiSchema['ui:globalOptions']?.stringEmptyValue === ''
            ? ''
            : undefined;
        }
        return value;
      case 'boolean':
        return value === 'on';
      case 'integer':
        return parseInt(value, 10);
      case 'number':
        return parseFloat(value);
      case 'null':
      case 'array':
      case 'object':
        throw new Error(`Unsupported schema type: ${type}`);
      default: {
        const n: never = type;
        throw new Error(`Unexpected schema type: ${n}`);
      }
    }
  };
}
