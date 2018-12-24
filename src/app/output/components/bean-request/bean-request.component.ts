import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/servicios/communication.service';
import { Utils } from 'src/app/utils/Utils';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-bean-request',
  templateUrl: './bean-request.component.html',
  styleUrls: ['./bean-request.component.scss']
})
export class BeanRequestComponent implements OnInit {

  req: string;

  constructor(private communication: CommunicationService, private conversor: Utils, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.communication.getRequest().subscribe(
      request => this.req = this.conversor.generarBeanRequest(request)
    );
  }

	copy() {
    this.openSnackBar('BeanRequest')
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Copiado', {
      duration: 2000,
    });
  }

}
