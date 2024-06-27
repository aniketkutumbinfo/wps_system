import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dif-config',
  templateUrl: './dif-config.component.html',
  styleUrls: ['./dif-config.component.scss']
})
export class DifConfigComponent implements OnInit {
  edit = false
  difConfigForm: FormGroup;
  getConfigDetail: any;
  apiList: string[];
  constructor(private departmentService: DepartmentService,
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
    this.departmentService.difConfigDisplay()
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
      this.departmentService.difConfigSetup(this.difConfigForm.value)
        .subscribe(res => {
          if (res) {
            this.edit = false;
            this.getConfigDetails();
          }
        })
    }
  }
}
