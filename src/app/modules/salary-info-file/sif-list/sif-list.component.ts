import { Component } from '@angular/core';
import { SifServiceService } from '../sif-service.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sif-list',
  templateUrl: './sif-list.component.html',
  styleUrls: ['./sif-list.component.scss']
})
export class SifListComponent {
  listSIFFiles: any = [];
  fileNameList: any = [];
  form!: FormGroup;

  constructor(private sfiSerive: SifServiceService,
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
    const { startDate, endDate } = this.form.value;
    const sDate = this.datePipe.transform(startDate, 'yyyy-MM-dd');
    const eDate = this.datePipe.transform(endDate, 'yyyy-MM-dd');
    this.sfiSerive.getSIFFiles(sDate, eDate).subscribe(res => {
      this.listSIFFiles = res;
    })
  }

}
