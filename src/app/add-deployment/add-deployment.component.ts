import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DeploymentService} from "../deployment.service";

@Component({
  selector: 'app-add-deployment',
  templateUrl: './add-deployment.component.html',
  styleUrls: ['./add-deployment.component.css']
})
export class AddDeploymentComponent implements OnInit {
  name: string;

  constructor(public activeModal: NgbActiveModal, private deploymentService: DeploymentService) { }

  async ok() {
    const newId = await this.deploymentService.add(this.name);
    this.activeModal.close(newId);
  }

  ngOnInit(): void {
  }

}
