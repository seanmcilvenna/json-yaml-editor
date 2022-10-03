export interface JsonSchema {
  type: string;
  id?: string;
  properties?: { [key: string]: JsonSchemaProperty };
}

export interface JsonSchemaProperty {
  type: 'object'|'string'|'boolean'|'date'|'datetime'|'integer'|'number';
  description?: string;
  id?: string;
  required?: boolean;
}
