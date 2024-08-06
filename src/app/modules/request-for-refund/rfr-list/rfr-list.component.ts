import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RfrService } from '../rfr.service';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rfr-list',
  templateUrl: './rfr-list.component.html',
  styleUrls: ['./rfr-list.component.scss']
})
export class RfrListComponent implements OnInit {

  listRFRFiles: any = [];
  fileNameList: any = [];
  form!: FormGroup;

  constructor(private rfrService: RfrService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required]
    });

    this.getData();
  }

  getData() {
    this.rfrService.getALLProceesedFiles().subscribe(res => {
      this.listRFRFiles = res;
    });
  }

  onFilter() {
    const { startDate, endDate } = this.form.value;
    const sDate = this.datePipe.transform(startDate, 'yyyy-MM-dd');
    const eDate = this.datePipe.transform(endDate, 'yyyy-MM-dd');
    this.rfrService.getRFRFiles(sDate, eDate).subscribe(res => {
      this.listRFRFiles = res;
    })
  }

}
