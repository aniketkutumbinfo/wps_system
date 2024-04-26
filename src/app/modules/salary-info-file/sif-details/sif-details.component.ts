import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SifServiceService } from '../sif-service.service';

@Component({
  selector: 'app-sif-details',
  templateUrl: './sif-details.component.html',
  styleUrls: ['./sif-details.component.scss']
})

export class SifDetailsComponent {
  fileName: any;
  sifFileDetail: any;
  value: any;
  constructor(private route: ActivatedRoute,
    private sfiSerive: SifServiceService,
  ) {

  }
  ngOnInit() {
    // 'fileName' is the name of the route parameter
    this.fileName = this.route.snapshot.params['fileName'];
    this.getData(this.fileName)
  }

  getData(fileName: any) {
    this.sfiSerive.getSIFFileDetail(fileName).subscribe(res => {
      this.sifFileDetail = res[0];
    })
  }

}
