import {Component} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public schema: any;
  public instance: any;
  private openSchemaModal: NgbModalRef;
  public schemaUrl: string;

  constructor(private modalService: NgbModal, private http: HttpClient) {
  }

  openSchema(content: any) {
    this.openSchemaModal = this.modalService.open(content);
    this.schemaUrl = localStorage.getItem('schema-url');
  }

  selectSchemaFile(files: FileList) {
    if (files.length != 1) return;

    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      const content = fileReader.result as string;
      this.schema = JSON.parse(content);
      this.instance = {};
    }
    fileReader.readAsText(files[0]);
  }

  async selectSchemaUrl(url: string) {
    this.schema = await this.http.get(url).toPromise();
    this.instance = {};
  }

  async ok(files: FileList, url: string) {
    if (files && files.length > 0) {
      this.selectSchemaFile(files);
    } else if (url) {
      await this.selectSchemaUrl(url);
      localStorage.setItem('schema-url', url);
    }

    this.openSchemaModal.close();
  }
}
