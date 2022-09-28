import { Pipe, PipeTransform } from '@angular/core';
import { stringify } from "yaml";

@Pipe({
  name: 'yaml'
})
export class YamlPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return stringify(value);
  }

}
