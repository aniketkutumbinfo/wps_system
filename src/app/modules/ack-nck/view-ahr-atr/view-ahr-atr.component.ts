import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-ahr-atr',
  templateUrl: './view-ahr-atr.component.html',
  styleUrls: ['./view-ahr-atr.component.scss']
})
export class ViewAhrAtrComponent implements OnInit {

  @Input() isVisible: boolean = false;
  @Input() data: any[] = [];
  @Output() closeFlyout = new EventEmitter<any>(undefined);

  constructor() { }

  ngOnInit(): void {

  }

  onCloseFlyout() {
    this.closeFlyout.emit(false);
  }

}
