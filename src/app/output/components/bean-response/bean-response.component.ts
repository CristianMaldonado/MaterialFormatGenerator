import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CommunicationService } from 'src/app/servicios/communication.service';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-bean-response',
  templateUrl: './bean-response.component.html',
  styleUrls: ['./bean-response.component.scss']
})
export class BeanResponseComponent implements OnInit {

  resp: string;

  constructor(private communication: CommunicationService, private conversor: Utils, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.communication.getResponse().subscribe(
      resp => this.resp = this.conversor.generarBeanResponse(resp)
    );
  }

  copy(){
    this.openSnackBar('BeanResponse');
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Copiado', {
      duration: 2000,
    });
  }

}
