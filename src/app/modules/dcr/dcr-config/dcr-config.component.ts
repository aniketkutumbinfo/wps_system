import { Component, OnInit } from '@angular/core';
import { DcrService } from '../dcr.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dcr-config',
  templateUrl: './dcr-config.component.html',
  styleUrls: ['./dcr-config.component.scss']
})
export class DcrConfigComponent implements OnInit {
  edit = false
  
  difConfigForm: FormGroup;
  getConfigDetail: any;
  apiList: string[];
  constructor(private dcrService: DcrService,
    private fb: FormBuilder
  ) {
    this.difConfigForm = this.fb.group({
      apiEnableDisable: "",
      countDays: "",
      countInDay: "",
      dateForDaysCount: "",
      recordCount: "",
      shedularTime: "",
      updatedDate: ""
    })
    this.apiList = ["D", "E"];
  }

  ngOnInit(): void {
    this.getConfigDetails();
  }

  getConfigDetails() {
    this.dcrService.dcrConfigDisplay()
      .subscribe(res => {
        console.log(res)
        this.getConfigDetail = [res]
      })
  }

  editConfig(data: any) {
    this.edit = true
    this.difConfigForm.patchValue({
      apiEnableDisable: data.apiEnableDisable,
      countDays: +data.countDays,
      countInDay: +data.countInDay,
      dateForDaysCount: data.dateForDaysCount,
      recordCount: +data.recordCount,
      shedularTime: data.shedularTime,
      updatedDate: data.updatedDate
    })
  }

  onSubmit() {
    if (this.difConfigForm.valid) {
      this.dcrService.dcrConfigSetup(this.difConfigForm.value)
        .subscribe(res => {
          if (res) {
            this.edit = false;
            this.getConfigDetails();
          }
        })
    }
  }

  backToList(){
    this.edit = false
  }

}
