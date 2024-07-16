import { Component, OnInit } from '@angular/core';
import { DcrService } from '../dcr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ack-ack-list',
  templateUrl: './ack-ack-list.component.html',
  styleUrls: ['./ack-ack-list.component.scss']
})
export class AckAckListComponent implements OnInit {

  getAllAckNckFilesList: any
  constructor(private dcrService: DcrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getAllAckNck();
  }

  getAllAckNck() {
    this.dcrService.getAckNckList().subscribe(res => {
      this.getAllAckNckFilesList = res;
    });
  }

  viewAckNakDetail(data: any) {
    console.log(data)
    this.router.navigate(['/dcr/ack-nak', data.ackNakFileName]);
  }

}
