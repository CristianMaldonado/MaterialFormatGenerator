import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CommunicationService } from 'src/app/servicios/communication.service';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-vjson',
  templateUrl: './vjson.component.html',
  styleUrls: ['./vjson.component.scss']
})
export class VjsonComponent implements OnInit {

  constructor(private communication: CommunicationService, private conversor: Utils, public snackBar: MatSnackBar) { }

  vJson: string;

  ngOnInit() {
    this.communication.getResponse().subscribe(
      response => this.vJson = this.conversor.generarVJson(response)
    );
  }

  copy() {
    this.openSnackBar('VJson');
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Copiado', {
      duration: 2000,
    });
  }
}
