import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PropertyWrapperComponent } from './property-wrapper/property-wrapper.component';
import {FormsModule} from "@angular/forms";
import { YamlPipe } from './yaml.pipe';
import {ConfigService} from "./config.service";
import {HttpClientModule} from "@angular/common/http";
import {DeploymentService} from "./deployment.service";
import { OpenDeploymentComponent } from './open-deployment/open-deployment.component';
import { AddComponentComponent } from './add-component/add-component.component';
import { AddDeploymentComponent } from './add-deployment/add-deployment.component';

export const configFactory = (configService: ConfigService) => {
  return () => configService.loadConfig();
};

@NgModule({
  declarations: [
    AppComponent,
    PropertyWrapperComponent,
    YamlPipe,
    OpenDeploymentComponent,
    AddComponentComponent,
    AddDeploymentComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ConfigService],
      multi: true
    },
    DeploymentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
