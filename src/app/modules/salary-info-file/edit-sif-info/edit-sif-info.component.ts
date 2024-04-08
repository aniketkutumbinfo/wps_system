import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-sif-info',
  templateUrl: './edit-sif-info.component.html',
  styleUrls: ['./edit-sif-info.component.scss']
})
export class EditSifInfoComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() closeFlyout = new EventEmitter<any>(undefined);
  @Input() data: any;
  editForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      paystartdate: [null],
      payenddate: [null],
      incomefixcomp: [null],
      incomevarcomp: [null],
      daysleaveprd: [null],
      recordtype: [null],
    });

  }

  onCloseFlyout() {
    this.closeFlyout.emit(false);
  }

  onSave() {

  }
}
