import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, ReplaySubject } from 'rxjs';
import { SifServiceService } from 'src/app/modules/salary-info-file/sif-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  // sifRecords = [{
  //   "id": 1,
  //   "recordtype": "EDR",
  //   "sifrecoredid": 1,
  //   "empid": "20001018808797",
  //   "agentroutingcode": "741310101",
  //   "empacctwithagent": "AE784130000000000010402",
  //   "paystartdate": "2024-01-01",
  //   "payenddate": "2024-01-31",
  //   "daysInPeriod": 30,
  //   "incomefixcomp": "1101",
  //   "incomevarcomp": "210",
  //   "daysleaveprd": "1",
  //   "makerdate": "2024-04-13"
  // },
  // {
  //   "id": 2,
  //   "recordtype": "EDR",
  //   "sifrecoredid": 2,
  //   "empid": "10027046778372",
  //   "agentroutingcode": "741310101",
  //   "empacctwithagent": "AE754130000000000008807",
  //   "paystartdate": "2024-01-31",
  //   "payenddate": "2024-01-31",
  //   "daysInPeriod": 30,
  //   "incomefixcomp": "1101",
  //   "incomevarcomp": "210",
  //   "daysleaveprd": "0",
  //   "makerdate": "2024-04-13"
  // },
  // {
  //   "id": 3,
  //   "recordtype": "EDR",
  //   "sifrecoredid": 3,
  //   "empid": "10022129171428",
  //   "agentroutingcode": "600310101",
  //   "empacctwithagent": "AE140030012870832910001",
  //   "paystartdate": "2024-01-01",
  //   "payenddate": "2024-01-31",
  //   "daysInPeriod": 30,
  //   "incomefixcomp": "5000",
  //   "incomevarcomp": "0",
  //   "daysleaveprd": "0",
  //   "makerdate": "2024-04-13"
  // }];
  sifRecords: any = [];
  value!: any
  uploadObj: any;
  showEditSIF = false;
  selectedRecord: any;

  constructor(private sfiSerive: SifServiceService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

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
          this.uploadObj = res;
          this.getData(res.employeruniqueid, res.makerdate);
        }
      })
    });
  }

  getData(id?: string, date?: any) {
    this.sfiSerive.getRecords(id, date).subscribe(res => {
      this.sifRecords = res.sifEdrBean;
    })
  }

  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event: any) => result.next(btoa(event.target.result.toString()));
    return result;
  }

  onEdit(data: any) {
    this.showEditSIF = true;
    this.selectedRecord = data;
  }

  onDelete(data: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this.sfiSerive.deleteRecord(data.sifrecoredid).subscribe(res => {
          if (res) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success', detail: 'Entry successfully deleted'
            });
            this.getData(this.uploadObj?.employeruniqueid, this.uploadObj?.makerdate);
          }
        });
      }
    });
  }

  onCloseShowEditSIF() {
    this.showEditSIF = false;
  }

  onUpdate(event: any) {
    if (event) {
      const payload = { ...this.uploadObj, ...event };
      this.sfiSerive.updateRecord(this.uploadObj.sifrecoredid, payload).subscribe(res => {
        if (res) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success', detail: 'Successfully updated'
          });
          this.showEditSIF = false;
          this.selectedRecord = undefined;
          this.getData(this.uploadObj?.employeruniqueid, this.uploadObj?.makerdate);
        }
      })
    }
  }
}
