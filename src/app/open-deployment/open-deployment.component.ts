import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DeploymentService} from "../deployment.service";
import {Deployment} from "../deployment";
import {AddDeploymentComponent} from "../add-deployment/add-deployment.component";

@Component({
  selector: 'app-open-deployment',
  templateUrl: './open-deployment.component.html',
  styleUrls: ['./open-deployment.component.css']
})
export class OpenDeploymentComponent implements OnInit {
  deployments: Deployment[];

  constructor(private modal: NgbModal, public activeModal: NgbActiveModal, private deploymentService: DeploymentService) { }

  async add() {
    const modalRef = this.modal.open(AddDeploymentComponent);
    modalRef.closed.subscribe(async (newId) => {
      this.deploymentService.current = await this.deploymentService.get(newId);
      this.activeModal.close();
    });
  }

  async select(deployment: Deployment) {
    this.deploymentService.current = await this.deploymentService.get(deployment.id);
    this.activeModal.close();
  }

  delete(deployment: Deployment) {

  }

  async ngOnInit() {
    this.deployments = await this.deploymentService.search();
  }
}
