import { Component } from '@angular/core';
import { SifServiceService } from '../sif-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-sif-list',
  templateUrl: './sif-list.component.html',
  styleUrls: ['./sif-list.component.scss']
})
export class SifListComponent {
  listSIFFiles: any = [];
  fileNameList: any = [];

  constructor(private sfiSerive: SifServiceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.sfiSerive.getSIFFiles().subscribe(res => {
      this.listSIFFiles = res;
    })
  }

  uploadSIF() {
    for (let i = 0; i < this.listSIFFiles.length; i++) {
      this.fileNameList.push(this.listSIFFiles[i].filename)
    }
    this.sfiSerive.uploadSIFSftp({ filenames: this.fileNameList }).subscribe(res => {
      if (res) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success', detail: 'Successfully uploaded'
        });
        this.getData();
      }
    })
  }

  onDelete(data: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this.sfiSerive.deleteSIFRecord(data).subscribe(res => {
          if (res) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success', detail: 'Entry successfully deleted'
            });
            this.getData();
          }
        });
      }
    });
  }
}
