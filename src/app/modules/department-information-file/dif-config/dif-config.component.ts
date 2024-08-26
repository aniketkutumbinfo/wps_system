import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-dif-config',
  templateUrl: './dif-config.component.html',
  styleUrls: ['./dif-config.component.scss']
})
export class DifConfigComponent implements OnInit {
  edit = false;
  difConfigForm: FormGroup;
  getConfigDetail: any;
  apiList: string[];

  constructor(
    private departmentService: DepartmentService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.difConfigForm = this.fb.group({
      apiEnableDisable: [null, Validators.required],
      countDays: [null, [Validators.required, Validators.min(0)]],
      countInDay: [null, [Validators.required, Validators.min(0)]],
      dateForDaysCount: [null, Validators.required],
      recordCount: [null, [Validators.required, Validators.min(0)]],
      shedularTime: [null, Validators.required],
      updatedDate: [{ value: '', disabled: true }] // Read-only field
    });
    this.apiList = ["D", "E"];
  }

  ngOnInit(): void {
    this.getConfigDetails();
  }

  getConfigDetails() {
    this.departmentService.difConfigDisplay()
      .pipe(
        catchError(err => {
          console.error('Error fetching configuration details:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Server Error',
            detail: 'Failed to fetch configuration details. Please try again later.'
          });
          return of({ responseStatus: 'error', responseData: [] });
        })
      )
      .subscribe(res => {
        if (res.responseStatus === 'success') {
          this.getConfigDetail = [res.responseData];
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load configuration details.'
          });
        }
      });
  }

  editConfig(data: any) {
    this.edit = true;
    this.difConfigForm.patchValue({
      apiEnableDisable: data.apiEnableDisable,
      countDays: data.countDays,
      countInDay: data.countInDay,
      dateForDaysCount: data.dateForDaysCount,
      recordCount: data.recordCount,
      shedularTime: data.shedularTime,
      updatedDate: data.updatedDate
    });
  }

  onSubmit() {
    if (this.difConfigForm.valid) {
      const formData = this.difConfigForm.value;

      this.departmentService.difConfigSetup(formData)
        .pipe(
          catchError(err => {
            console.error('Error saving configuration:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Server Error',
              detail: 'An error occurred while saving configuration. Please try again later.'
            });
            return of({ responseStatus: 'error' });
          })
        )
        .subscribe(res => {
          if (res.responseStatus === 'success') {
            this.edit = false;
            this.getConfigDetails();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Configuration saved successfully.'
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to save configuration. Please try again.'
            });
          }
        });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields correctly.'
      });
    }
  }

  backToList() {
    this.edit = false;
  }
}
