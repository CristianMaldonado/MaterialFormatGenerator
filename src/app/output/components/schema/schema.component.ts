import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Utils } from 'src/app/utils/Utils';
import { CommunicationService } from 'src/app/servicios/communication.service';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss']
})
export class SchemaComponent implements OnInit {
  schema: string;

  constructor(private communication: CommunicationService, private conversor: Utils, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.communication.getRequest().subscribe(
      req => this.schema = this.conversor.generarSchemaRequest(req)
    );
  }

  copy() {
    this.openSnackBar('Schema');
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Copiado', {
      duration: 2000,
    });
  }

}
