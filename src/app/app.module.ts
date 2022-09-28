import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PropertyWrapperComponent } from './property-wrapper/property-wrapper.component';
import {FormsModule} from "@angular/forms";
import { YamlPipe } from './yaml.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PropertyWrapperComponent,
    YamlPipe
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
