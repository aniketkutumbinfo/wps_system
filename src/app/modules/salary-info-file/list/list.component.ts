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
  uploadedFileName: any;
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
    this.getAllPendingSif();
  }

  getAllPendingSif() {
    this.sfiSerive.getAllPendingSif().subscribe(res => {
      this.sifRecords = res;
    });
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
      this.sfiSerive.uploadCSVFile(item).subscribe(res => {
        if (res) {
          this.messageService.add({ severity: 'success', summary: res.responsemassage });
          this.uploadedFileName = res.fileName;
          this.getAllPendingSif();
        }
      }, err => {
        const error = err.error;
        this.messageService.add({ severity: 'error', summary: `${error.fileName} ${error.responsemassage}` })
      })
    });
  }

  getData(fileName?: string) {
    this.sfiSerive.getRecords(fileName).subscribe(res => {
      this.sifRecords = res;
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
    this.sifscrfileid = item.sifScrBean[0].sifscrfileid;
  }

  onDelete(data: any, item: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this.sfiSerive.deleteRecord(item.sifScrBean[0].sifscrfileid, data.sifedrfileid).subscribe(res => {
          if (res) {
            this.messageService.add({
              severity: 'success', detail: res.responsemassage
            });
            this.getAllPendingSif();
          }
        });
      }
    });
  }

  deleteSifFile(item: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this.sfiSerive.deleteSifFile(item.siffileName).subscribe(res => {
          if (res) {
            this.messageService.add({
              severity: 'success', detail: res.responsemassage
            });
            this.getAllPendingSif();
          }
        });
      }
    });
  }

  onCloseShowEditSIF() {
    this.showEditSIF = false;
    this.getData(this.uploadedFileName);
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
          this.getAllPendingSif();
        }
      })
    }
  }

  onTabClose(event: any) {
  }

  onTabOpen(event: any) {
  }

  createZipFile(item: any) {
    this.sfiSerive.uploadSIFSftp(item.siffileName).subscribe(res => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success', detail: res.responsemassage
      });
      this.getAllPendingSif();
    })
    
  }

}
