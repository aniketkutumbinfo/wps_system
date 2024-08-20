import { Component, OnInit } from '@angular/core';
import { DcrService } from '../dcr.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  getAllDcrFilesList!: any[];
  selectedProducts!: any[];
  constructor(private difService: DcrService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.getAllDcrFiles();
  }

  getAllDcrFiles() {
    this.difService.getAllDcrFiles().subscribe(res => {
      if (res.responseStatus === 'success') {
        this.getAllDcrFilesList = res.responseData;
      }
    });
  }

  viewDcrDetail(data: any) {
    this.router.navigate(['/dcr/view', data.dcrFileId]);
  }

  viewAckNakDetail(data: any) {
    this.router.navigate(['/dcr/ack-nak', data.dcrFileName]);
  }

  // onDelete(data: any) {
  //   let item =
  //   {
  //     "diffilenames": this.selectedProducts
  //   }
  //   this.confirmationService.confirm({
  //     message: 'Are you sure that you want to delete?',
  //     accept: () => {
  //       this.difService.deleteByDifId(item).subscribe(res => {
  //         if (res) {
  //           this.messageService.add({
  //             severity: 'success', detail: res.responsemassage
  //           });
  //           this.getAllDifFiles();
  //         }
  //       });
  //     }
  //   });
  // }

  allDelete() {
    let item =
    {
      "diffilenames": this.selectedProducts.map(a => a.dcrFileName)
    }
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this.difService.deleteByDifId(item).subscribe(res => {
          if (res) {
            this.messageService.add({
              severity: 'success', detail: res.responsemassage
            });
            this.getAllDcrFiles();
          }
        });
      }
    });
  }

}
