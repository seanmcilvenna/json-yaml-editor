import {JsonSchema} from "./json-schema";

export class ComponentConfig {
  name: string;
  schema: JsonSchema;
  schemaUrl: string;
  instance: any;
}
