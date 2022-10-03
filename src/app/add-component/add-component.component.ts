import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ComponentConfig} from "../component-config";
import {HttpClient} from "@angular/common/http";
import {DeploymentService} from "../deployment.service";

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.css']
})
export class AddComponentComponent implements OnInit {
  name: string;
  files: FileList;
  schemaUrl: string;

  constructor(public activeModal: NgbActiveModal, private http: HttpClient, private deploymentService: DeploymentService) { }

  async ok() {
    const newComponent = new ComponentConfig();
    newComponent.name = this.name;
    newComponent.instance = {};

    if (this.files != null && this.files.length > 0) {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        const content = fileReader.result as string;
        newComponent.schema = JSON.parse(content);
        newComponent.instance = {};
      }
      fileReader.readAsText(this.files[0]);
    } else if (this.schemaUrl) {
      newComponent.schema = (await this.http.get(this.schemaUrl).toPromise()) as any;
      newComponent.schemaUrl = this.schemaUrl;
    }

    if (!newComponent.schema) {
      alert('Schema could not be loaded');
      return;
    }

    this.deploymentService.current.components = this.deploymentService.current.components || [];
    this.deploymentService.current.components.push(newComponent);
    await this.deploymentService.update();
    this.activeModal.close();
  }

  ngOnInit(): void {
  }

}
