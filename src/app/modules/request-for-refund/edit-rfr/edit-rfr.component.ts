import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-rfr',
  templateUrl: './edit-rfr.component.html',
  styleUrls: ['./edit-rfr.component.scss']
})
export class EditRfrComponent implements OnInit {

  @Input() isVisible: boolean = false;
  @Output() closeFlyout = new EventEmitter<any>(undefined);
  @Output() update = new EventEmitter<any>(undefined);
  @Input() data: any;
  editForm!: FormGroup;

  constructor() {

  }

  ngOnInit(): void {
    
  }

}
