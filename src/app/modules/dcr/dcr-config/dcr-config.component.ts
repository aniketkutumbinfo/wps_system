import { Component, OnInit } from '@angular/core';
import { DcrService } from '../dcr.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';

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
    private fb: FormBuilder,
    private messageService: MessageService
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
        if (res.responseStatus === 'success') {
          this.getConfigDetail = [res.responseData];
        }
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
    // Check if the form is valid
    if (this.difConfigForm.valid) {
      // Extract form values
      const formData = this.difConfigForm.value;

      // Call the service method to submit the configuration
      this.dcrService.dcrConfigSetup(formData)
        .subscribe({
          next: (res) => {
            // Check if the response is successful
            if (res && res.responseStatus === 'success') {
              // Set edit mode to false and refresh the configuration details
              this.edit = false;
              this.getConfigDetails();

              // Notify user of successful configuration
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Configuration saved successfully.'
              });
            } else {
              // Handle cases where the response indicates failure
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to save configuration. Please try again.'
              });
            }
          },
          error: (err) => {
            // Handle any errors from the server
            console.error('Configuration setup error:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Server Error',
              detail: 'An error occurred while saving configuration. Please try again later.'
            });
          }
        });
    } else {
      // Notify user if the form is invalid
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields correctly.'
      });
    }
  }


  backToList() {
    this.edit = false
  }

}
