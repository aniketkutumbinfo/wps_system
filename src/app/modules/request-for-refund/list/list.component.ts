import { Component, OnInit } from '@angular/core';
import { RfrService } from '../rfr.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  rfrRecords: any = [];
  value!: any
  uploadedFileName: any;
  showEditSIF = false;
  selectedRecord: any;
  sifedrrecoreds: any = [];
  sifscrrecored: any = {};
  sifscrfileid: any;

  constructor(
    private rfrService: RfrService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit() {
    this.getAllPendingRFR();
  }

  getAllPendingRFR() {
    this.rfrService.getAllPendingRFR().subscribe(res => {
      this.rfrRecords = res;
    });
  }

  selectedFileChange(event: any, type: string) {
    let uploadedFiles: any;
    if (type === 'drop') {
      uploadedFiles = event[0];
    } else {
      uploadedFiles = event.target.files[0];
    }

    this.convertFile(event.target.files[0]).subscribe((base64: any) => {
      let item = {
        wpsFileType: "RFR",
        fileName: uploadedFiles.name,
        base64: "Q29ycG9yYXRlIElELHNpZiBGaWxlIG5hbWUsc2lmIGFjayBmaWxlIG5hbWUsQWdlbnRzIFJvdXRpbmcgQ29kZSxlbXBsb3llZSBpZCxSZWZ1bmQgQW1vdW50LFJlZnVuZCBSZXF1ZXN0IENvZGUsRW1wbG95ZWUgQWNjb3VudCB3aXRoIEFnZW50LEFjY291bnQgTnVtYmVyIEVtcGxveWVlIHdpdGggQmFuawowMDAwMDAwMDAwNjE3LDAwMDAwMDAwMDA2MTcyNDA1MzExMTI2MDIuU0lGLDAwMDAwMDAwMDA2MTcyNDA1MzExMTI2MDIxMjQwMDAwMTM0ODMuQUNLLDc0MTMxMDEwMSwxMDAyOTA1Nzc2NDgxMCwxMDAwLDAwMSxBRTU2NDEzMDAwMDAwMDAwMDAyMDQwMSwwMDAwMDAwMDAwMDAwMENSTUlEMDYxNwo="
      }
      this.rfrService.uploadRFRFile(item).subscribe(res => {
        if (res) {
          this.messageService.add({ severity: 'success', summary: res.responsemassage });
          this.uploadedFileName = res.fileName;
          this.getAllPendingRFR();
        }
      }, err => {
        const error = err.error;
        this.messageService.add({ severity: 'error', summary: `${error.fileName} ${error.responsemassage}` })
      })
    });
  }

  getData(fileName?: string) {
    this.rfrService.getRFRByFileName(fileName).subscribe(res => {
      this.rfrRecords = res;
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
        this.rfrService.deleteFCR(item.rfrfileid, data.rfrfdrfileid).subscribe(res => {
          if (res) {
            this.messageService.add({
              severity: 'success', detail: res.responsemassage
            });
            this.getAllPendingRFR();
          }
        });
      }
    });
  }

  deleteRFRFile(item: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this.rfrService.deletePendingRFR(item.rfrfileName).subscribe(res => {
          if (res) {
            this.messageService.add({
              severity: 'success', detail: res.responsemassage
            });
            this.getAllPendingRFR();
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
      this.rfrService.updateFCR(payload).subscribe(res => {
        if (res) {
          this.messageService.add({
            severity: 'success',
            summary: res.responsemassage
          });
          this.showEditSIF = false;
          this.selectedRecord = undefined;
          this.getAllPendingRFR();
        }
      })
    }
  }

  onTabClose(event: any) {
  }

  onTabOpen(event: any) {
  }

  createZipFile(item: any) {
    this.rfrService.uploadRFRToftp(item.rfrfileName).subscribe(res => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success', detail: res.responsemassage
      });
      this.getAllPendingRFR();
    })

  }
}
