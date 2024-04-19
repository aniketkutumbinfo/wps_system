import { Component } from '@angular/core';
import { SifServiceService } from '../sif-service.service'; 

@Component({
  selector: 'app-sif-list',
  templateUrl: './sif-list.component.html',
  styleUrls: ['./sif-list.component.scss']
})
export class SifListComponent {
  listSIFFiles = []
  constructor(private sfiSerive: SifServiceService, 
  ) { }

  ngOnInit() {
    this.getData();
  }


  getData() {
    this.sfiSerive.getSIFFiles().subscribe(res => {
      this.listSIFFiles = res;
    })
  } 
}
