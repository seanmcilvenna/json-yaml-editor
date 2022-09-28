import {Component, Input, OnInit} from '@angular/core';

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

  constructor() { }

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
    if (this.property && this.property.type === 'object' && this.propertyName && this.parentObj && !this.parentObj[this.propertyName]) {
      this.parentObj[this.propertyName] = {};
    }
  }
}
