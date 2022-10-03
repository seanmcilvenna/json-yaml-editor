import {ComponentConfig} from "./component-config";

export class Deployment {
  id: string;
  name: string;
  description: string;
  components: ComponentConfig[];
}
