import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  getAllDifFilesList!: any[];
  selectedProducts!: any[];
  constructor(private difService: DepartmentService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.getAllDifFiles();
  }

  getAllDifFiles() {
    this.difService.getAllDifFiles().subscribe(res => {
      if (res.responseStatus === 'success') {
        this.getAllDifFilesList = res.responseData;
      }
    });
  }

  viewDifDetail(data: any) {
    this.router.navigate(['/dif/view', data.difFileId]);
  }

  viewAckNakDetail(data: any) {
    this.router.navigate(['/dif/ack-nak', data.difFileName]);
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
      "diffilenames": this.selectedProducts.map(a => a.difFileName)
    }
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this.difService.deleteByDifId(item).subscribe(res => {
          if (res) {
            this.messageService.add({
              severity: 'success', detail: res.responsemassage
            });
            this.getAllDifFiles();
          }
        });
      }
    });
  }
}
