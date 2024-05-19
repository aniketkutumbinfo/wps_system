import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, ReplaySubject } from 'rxjs';
import { SifServiceService } from 'src/app/modules/salary-info-file/sif-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  sifRecords: any = [];
  value!: any
  uploadObj: any;
  showEditSIF = false;
  selectedRecord: any;
  sifedrrecoreds: any = [];
  sifscrrecored: any = {};
  sifscrfileid: any;

  constructor(private sfiSerive: SifServiceService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit() {
    this.getData();
  }

  selectedFileChange(event: any, type: string) {
    let uploadedFiles: any;
    if (type === 'drop') {
      uploadedFiles = event[0];
    } else {
      uploadedFiles = event.target.files[0];
    }

    this.convertFile(event.target.files[0]).subscribe(base64 => {
      let item = {
        wpsFileType: "SIF",
        fileName: uploadedFiles.name,
        base64: "TW9pbCBJZCxFbXBsb3llciBJZCxSb3V0aW5nIENvZGUsSWJhbiBObyxJbmNvbWUgZml4IENvbXBvbmVudCxJbmNvbWUgVmFyaWFibGUgQ29tcG9uZW50LExlYXZlIFBlcmlvZCxQYXkgU3RhcnQgRGF0ZSxQYXkgRW5kIERhdGUsU2FsYXJ5IE1vbnRoDQowMDAwMDAwMDAwNjE3LDIwMDAxMDE4ODA4Nzk3LDc0MTMxMDEwMSxBRTc4NDEzMDAwMDAwMDAwMDAxMDQwMiwxMTAxLDIxMCwxLDIwMjQtMDEtMDEsMjAyNC0wMS0zMSwwMjIwMjQNCjAwMDAwMDAwMDA2MTcsMTAwMjcwNDY3NzgzNzIsNzQxMzEwMTAxLEFFNzU0MTMwMDAwMDAwMDAwMDA4ODA3LDExMDEsMjEwLDAsMjAyNC0wMS0wMSwyMDI0LTAxLTMxLDAyMjAyNA0KMDAwMDAwMDAwMDYxNywxMDAyMjEyOTE3MTQyOCw2MDAzMTAxMDEsQUUxNDAwMzAwMTI4NzA4MzI5MTAwMDEsNTAwMCwwLDAsMjAyNC0wMS0wMSwyMDI0LTAxLTMxLDAyMjAyNA=="
      }
      this.sfiSerive.createExcelTable(item).subscribe(res => {
        if (res) {
          this.messageService.add({ severity: 'success', summary: res.responsemassage });
          this.uploadObj = res;
          this.getData(uploadedFiles.name);
        }
      }, err => this.messageService.add({ severity: 'error', summary: err }))
    });
  }

  getData(fileName?: string) {
    this.sfiSerive.getRecords(fileName).subscribe(res => {
      this.sifRecords = res[0].sifScrBean;

    })
  }

  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event: any) => result.next(btoa(event.target.result.toString()));
    return result;
  }

  onEdit(data: any, item: any) {
    this.showEditSIF = true;
    this.selectedRecord = data;
    this.sifscrfileid = item.sifscrfileid;
  }

  onDelete(data: any, item: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this.sfiSerive.deleteRecord(item.sifscrfileid, data.sifedrfileid).subscribe(res => {
          if (res) {
            this.messageService.add({
              severity: 'success', detail: res.responsemassage
            });
            this.getData(this.uploadObj?.sifcsvfilename);
          }
        });
      }
    });
  }

  onCloseShowEditSIF() {
    this.showEditSIF = false;
    this.getData(this.uploadObj?.sifcsvfilename);
  }

  onUpdate(event: any) {
    const payload = {
      "sifscrfileid": this.sifscrfileid,
      ...this.selectedRecord,
      ...event
    }
    if (event) {
      this.sfiSerive.updateRecord(payload).subscribe(res => {
        if (res) {
          this.messageService.add({
            severity: 'success',
            summary: res.responsemassage
          });
          this.showEditSIF = false;
          this.selectedRecord = undefined;
          this.getData(this.uploadObj?.sifcsvfilename);
        }
      })
    }
  }

  onTabClose(event: any) {
  }

  onTabOpen(event: any) {
  }

  createZipFile(item: any) {
    for (let j = 0; j < item?.sifEdrBean?.length; j++) {
      delete item?.sifEdrBean[j]?.sifedrfileid
      this.sifedrrecoreds.push(item?.sifEdrBean[j])
    }
    delete item?.sifEdrBean
    // delete item?.sifscrfileid
    this.sifscrrecored = item;
    let payload = {
      "sifextension": "SIF",
      "corporateid": "0000000000617",
      "sifscrfileid": item?.sifscrfileid,
      "sifedrrecords": this.sifedrrecoreds,
      "sifscrrecord": this.sifscrrecored
    }
    this.sfiSerive.createZipFile(payload).subscribe(res => {
      if (res) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success', detail: 'Successfully created'
        });
        this.router.navigate(['sif/files']);
      }
    })
  }

}
