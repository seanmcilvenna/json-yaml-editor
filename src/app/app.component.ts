import {Component} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient} from "@angular/common/http";
import {DeploymentService} from "./deployment.service";
import {OpenDeploymentComponent} from "./open-deployment/open-deployment.component";
import {AddComponentComponent} from "./add-component/add-component.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private modalService: NgbModal, private http: HttpClient, public deploymentService: DeploymentService) {
  }

  openDeployment() {
    this.modalService.open(OpenDeploymentComponent);
  }

  addComponent() {
    this.modalService.open(AddComponentComponent);
  }
}
