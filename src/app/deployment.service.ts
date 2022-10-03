import { Injectable } from '@angular/core';
import {Deployment} from "./deployment";
import {HttpClient} from "@angular/common/http";
import {ComponentConfig} from "./component-config";

@Injectable({
  providedIn: 'root'
})
export class DeploymentService {
  current: Deployment;
  currentComponent: ComponentConfig;

  constructor(private http: HttpClient) { }

  private makeId(length: number) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async add(name: string) {
    const newDep = new Deployment();
    newDep.id = this.makeId(10);
    newDep.name = name;

    await this.http.post('/api/deployment', newDep).toPromise();

    this.current = newDep;
    return newDep.id;
  }

  async get(id: string) {
    return await this.http.get<Deployment>(`/api/deployment/${id}`).toPromise();
  }

  async update() {
    await this.http.put(`/api/deployment/${this.current.id}`, this.current).toPromise();
  }

  async search() {
    return await this.http.get<Deployment[]>('/api/deployment').toPromise();
  }
}
