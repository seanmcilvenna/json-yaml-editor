import {Component, Input, OnInit} from '@angular/core';
import {ConfigService} from "../config.service";
import {debounceTime, Subject} from "rxjs";
import {DeploymentService} from "../deployment.service";

@Component({
  selector: 'app-property-wrapper',
  templateUrl: './property-wrapper.component.html',
  styleUrls: ['./property-wrapper.component.css']
})
export class PropertyWrapperComponent implements OnInit {
  @Input() property: any;
  @Input() propertyName: any;
  @Input() schema: any;
  @Input() parentObj: any;
  public changed = new Subject<void>();

  constructor(public configService: ConfigService, private deploymentService: DeploymentService) {
    this.changed.pipe(debounceTime(1000)).subscribe(async () => {
      await this.deploymentService.update();
    });
  }

  get booleanValue() {
    return this.parentObj[this.propertyName];
  }

  set booleanValue(value: string) {
    if (value && value.toLowerCase() === 'true') {
      this.parentObj[this.propertyName] = true;
    } else if (value && value.toLowerCase() === 'false') {
      this.parentObj[this.propertyName] = false;
    } else {
      delete this.parentObj[this.propertyName];
    }
  }

  get propertyNameDisplay() {
    const result = this.propertyName.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  ngOnInit(): void {
    if (this.property && this.propertyName) {
      if (this.property.type === 'object' && this.parentObj && !this.parentObj[this.propertyName]) {
        this.parentObj[this.propertyName] = {};
      } else if (this.parentObj && !this.parentObj[this.propertyName] && this.property.default) {
        switch (this.property.type) {
          case 'boolean':
            this.parentObj[this.propertyName] = this.property.default.toLowerCase() === 'true';
            break;
          case 'integer':
          case 'number':
            this.parentObj[this.propertyName] = parseInt(this.propertyName.default);
            break;
          default:
            this.parentObj[this.propertyName] = this.property.default;
            break;
        }
      }
    }
  }
}
