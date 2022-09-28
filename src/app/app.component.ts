import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public schema: any;
  public instance: any;

  public selectSchema(files: FileList) {
    if (files.length != 1) return;

    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      const content = fileReader.result as string;
      this.schema = JSON.parse(content);
      this.instance = {};
    }
    fileReader.readAsText(files[0]);
  }
}
