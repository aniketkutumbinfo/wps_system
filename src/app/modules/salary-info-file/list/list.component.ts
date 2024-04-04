import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { SifServiceService } from 'src/app/shared/services/sif-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  products!: any;
  selectedProducts!: any;
  value!: any
  selectedFile: any;
  constructor(private commonService: CommonService,
    private router: Router,
    private sfiSerive: SifServiceService) { }

  ngOnInit() {
  }

  base64Output: any
  selectedFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.base64Output = base64;
      console.log(this.base64Output)
      let item = {
        wpsFileType: "SIF",
        fileName: this.selectedFile.name,
        base64: "TW9pbCBJZCxFbXBsb3llciBJZCxSb3V0aW5nIENvZGUsSWJhbiBObyxJbmNvbWUgZml4IENvbXBvbmVudCxJbmNvbWUgVmFyaWFibGUgQ29tcG9uZW50LExlYXZlIFBlcmlvZCxQYXkgU3RhcnQgRGF0ZSxQYXkgRW5kIERhdGUsU2FsYXJ5IE1vbnRoDQowMDAwMDAwMDAwNjE3LDIwMDAxMDE4ODA4Nzk3LDc0MTMxMDEwMSxBRTc4NDEzMDAwMDAwMDAwMDAxMDQwMiwxMTAxLDIxMCwxLDIwMjQtMDEtMDEsMjAyNC0wMS0zMSwwMjIwMjQNCjAwMDAwMDAwMDA2MTcsMTAwMjcwNDY3NzgzNzIsNzQxMzEwMTAxLEFFNzU0MTMwMDAwMDAwMDAwMDA4ODA3LDExMDEsMjEwLDAsMjAyNC0wMS0wMSwyMDI0LTAxLTMxLDAyMjAyNA0KMDAwMDAwMDAwMDYxNywxMDAyMjEyOTE3MTQyOCw2MDAzMTAxMDEsQUUxNDAwMzAwMTI4NzA4MzI5MTAwMDEsNTAwMCwwLDAsMjAyNC0wMS0wMSwyMDI0LTAxLTMxLDAyMjAyNA=="
      }
      console.log(item)
      this.sfiSerive.createExcelTable(item).subscribe(res => {
        console.log(res)
        if(res){
          this.products = res
        }
      })
    });
  }

  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event: any) => result.next(btoa(event.target.result.toString()));
    return result;
  }
}
