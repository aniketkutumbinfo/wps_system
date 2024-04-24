import { Component } from '@angular/core';
import { SifServiceService } from '../sif-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sif-list',
  templateUrl: './sif-list.component.html',
  styleUrls: ['./sif-list.component.scss']
})
export class SifListComponent {
  listSIFFiles: any = []
  constructor(private sfiSerive: SifServiceService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getData();
  }


  getData() {
    this.sfiSerive.getSIFFiles().subscribe(res => {
      this.listSIFFiles = res;
    })
  }

  fileNameList: any = []
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
}
