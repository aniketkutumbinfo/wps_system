import { Component, OnInit } from '@angular/core';
import { DcrService } from '../dcr.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dcr-config',
  templateUrl: './dcr-config.component.html',
  styleUrls: ['./dcr-config.component.scss']
})
export class DcrConfigComponent implements OnInit {
  edit = false;

  difConfigForm: FormGroup;
  getConfigDetail: any;
  apiList: string[];

  constructor(private dcrService: DcrService,
    private fb: FormBuilder,
    private messageService: MessageService) {
    this.difConfigForm = this.fb.group({
      apiEnableDisable: ['', Validators.required],
      countDays: ['', [Validators.required, Validators.min(0)]],
      countInDay: ['', [Validators.required, Validators.min(0)]],
      dateForDaysCount: ['', Validators.required],
      recordCount: ['', [Validators.required, Validators.min(0)]],
      shedularTime: ['', Validators.required],
      updatedDate: [{ value: '', disabled: true }]
    });
    this.apiList = ["D", "E"];
  }

  ngOnInit(): void {
    this.getConfigDetails();
  }

  getConfigDetails() {
    this.dcrService.dcrConfigDisplay()
      .subscribe({
        next: res => {
          if (res.responseStatus === 'success') {
            this.getConfigDetail = [res.responseData];
          } else {
            this.messageService.add({
              severity: 'warn',
              summary: 'Warning',
              detail: 'No configuration data found.'
            });
          }
        },
        error: err => {
          console.error('Error fetching configuration details:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Server Error',
            detail: 'An error occurred while fetching configuration details. Please try again later.'
          });
        }
      });
  }

  editConfig(data: any) {
    this.edit = true;
    this.difConfigForm.patchValue({
      apiEnableDisable: data.apiEnableDisable,
      countDays: +data.countDays,
      countInDay: +data.countInDay,
      dateForDaysCount: data.dateForDaysCount,
      recordCount: +data.recordCount,
      shedularTime: data.shedularTime,
      updatedDate: data.updatedDate
    });
  }

  onSubmit() {
    if (this.difConfigForm.valid) {
      const formData = this.difConfigForm.value;

      this.dcrService.dcrConfigSetup(formData)
        .subscribe({
          next: res => {
            if (res && res.responseStatus === 'success') {
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
          },
          error: err => {
            console.error('Configuration setup error:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Server Error',
              detail: 'An error occurred while saving configuration. Please try again later.'
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
