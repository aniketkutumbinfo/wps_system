import { Component, OnInit } from '@angular/core';
import { RFRAckNckService } from '../ack-nck.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ack-nck-list',
  templateUrl: './ack-nck-list.component.html',
  styleUrls: ['./ack-nck-list.component.scss']
})
export class AckNckListComponent implements OnInit {

  allRecords: any[] = [];
  selectedData: any[] = [];
  openFlyout = false;
  allTypes = [
    {
      label: 'Filter By File Name',
      id: 'file'
    },
    {
      label: 'Filter By Date',
      id: 'date'
    }
  ];
  selectedTypeId: string = 'file';
  form!: FormGroup;

  constructor(private ackService: RFRAckNckService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      fileName: '',
      startDate: [new Date()],
      endDate: [new Date()]
    })

    this.ackService.getAllAckNck().subscribe(res => {
      this.allRecords = res;
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error while fetching ACK & NCK ' });
    });
  }

  onTypeChange(event: any) {
    this.form.reset();
    this.selectedTypeId = event.value;
  }

  openDialog(data: any) {
    this.openFlyout = true;
    this.selectedData = data;
  }

  onCloseFlyout() {
    this.openFlyout = false;
    this.selectedData = [];
  }

  fetchData() {
    if (this.selectedTypeId === 'file') {
      if (!this.form.get('fileName')?.value) {
        this.messageService.add({ severity: 'warn', summary: 'Please enter file name ' });
        return;
      }
      this.ackService.findAckNckByFileName(this.form.get('fileName')?.value).subscribe(res => {
        this.allRecords = [];
        this.allRecords = res;
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'Error while fetching ACK & NCK ' });
      });
    } else {
      if (!this.form.get('startDate')?.value && !this.form.get('endDate')?.value) {
        this.messageService.add({ severity: 'warn', summary: 'Please select dates ' });
        return;
      }

      const { startDate, endDate } = this.form.value;
      const sDate = this.datePipe.transform(startDate, 'yyyy-MM-dd');
      const eDate = this.datePipe.transform(endDate, 'yyyy-MM-dd');

      this.ackService.findAckNckByDate(sDate, eDate).subscribe(res => {
        this.allRecords = [];
        this.allRecords = res;
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'Error while fetching ACK & NCK ' });
      });
    }
  }

}
