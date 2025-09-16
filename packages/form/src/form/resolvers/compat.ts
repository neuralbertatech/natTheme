import {
  getSimpleSchemaType,
  isFileSchema,
  isFixedItems,
  type Validator,
} from "@/core/index.js";

import {
  type FormInternalContext,
  isFilesArray,
  isMultiSelect,
  isSelect,
  retrieveUiOption,
} from "../context/index.js";
import type { ResolveFieldType } from "../fields.js";

import "../extra-fields/enum.js";
import "../extra-fields/multi-enum.js";
import "../extra-fields/file.js";
import "../extra-fields/files.js";

export function resolver<V extends Validator>(
  ctx: FormInternalContext<V>
): ResolveFieldType {
  return (config) => {
    const { schema } = config;
    if (isSelect(ctx, schema)) {
      return "enumField";
    }
    if (schema.oneOf !== undefined) {
      return "oneOfField";
    }
    if (schema.anyOf !== undefined) {
      return "anyOfField";
    }
    const type = getSimpleSchemaType(schema);
    if (type === "array") {
      if (isMultiSelect(ctx, schema)) {
        return "multiEnumField";
      }
      if (isFixedItems(schema)) {
        return "tupleField";
      }
      if (
        isFilesArray(ctx, schema) &&
        retrieveUiOption(ctx, config, "orderable") !== true
      ) {
        return "filesField";
      }
      return "arrayField";
    }
    if (isFileSchema(schema)) {
      return "fileField";
    }
    return `${type}Field`;
  };
}
