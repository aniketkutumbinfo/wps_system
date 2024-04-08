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
  sifRecords = [
    {
      empid: 123,
      paystartdate: new Date(),
      payenddate: new Date(),
      incomefixcomp: 1223,
      incomevarcomp: 1223,
      daysleaveprd: 'dasdasd',
      recordtype: 'New'
    }
  ];
  value!: any
  selectedFile: any;
  showEditSIF = false;
  selectedRecord: any;

  constructor(private sfiSerive: SifServiceService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  selectedFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      let item = {
        wpsFileType: "SIF",
        fileName: this.selectedFile.name,
        base64: "TW9pbCBJZCxFbXBsb3llciBJZCxSb3V0aW5nIENvZGUsSWJhbiBObyxJbmNvbWUgZml4IENvbXBvbmVudCxJbmNvbWUgVmFyaWFibGUgQ29tcG9uZW50LExlYXZlIFBlcmlvZCxQYXkgU3RhcnQgRGF0ZSxQYXkgRW5kIERhdGUsU2FsYXJ5IE1vbnRoDQowMDAwMDAwMDAwNjE3LDIwMDAxMDE4ODA4Nzk3LDc0MTMxMDEwMSxBRTc4NDEzMDAwMDAwMDAwMDAxMDQwMiwxMTAxLDIxMCwxLDIwMjQtMDEtMDEsMjAyNC0wMS0zMSwwMjIwMjQNCjAwMDAwMDAwMDA2MTcsMTAwMjcwNDY3NzgzNzIsNzQxMzEwMTAxLEFFNzU0MTMwMDAwMDAwMDAwMDA4ODA3LDExMDEsMjEwLDAsMjAyNC0wMS0wMSwyMDI0LTAxLTMxLDAyMjAyNA0KMDAwMDAwMDAwMDYxNywxMDAyMjEyOTE3MTQyOCw2MDAzMTAxMDEsQUUxNDAwMzAwMTI4NzA4MzI5MTAwMDEsNTAwMCwwLDAsMjAyNC0wMS0wMSwyMDI0LTAxLTMxLDAyMjAyNA=="
      }
      this.sfiSerive.createExcelTable(item).subscribe(res => {
        console.log(res)
        if (res) {
          this.getData('0000000000617', '2024-03-09');
        }
      })
    });
  }

  getData(id: string, date: any) {
    this.sfiSerive.getRecords(id, date).subscribe(res => {
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

  onEdit(data: any) {
    this.showEditSIF = true;
    this.selectedRecord = data;
  }

  onDelete(data: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this.sfiSerive.deleteRecord(data.id).subscribe(res => {
          if (res) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success', detail: 'Entry successfully deleted'
            });
            this.getData('0000000000617', '2024-03-09');
          }
        });
      }
    });
  }

  onCloseShowEditSIF() {
    this.showEditSIF = false;
  }
}
