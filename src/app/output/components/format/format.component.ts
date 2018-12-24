
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CommunicationService } from 'src/app/servicios/communication.service';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-format',
  templateUrl: './format.component.html',
  styleUrls: ['./format.component.scss']
})
export class FormatComponent implements OnInit {

  constructor(private conversor: Utils, private communication: CommunicationService, public snackBar: MatSnackBar) { }

  requestToShow: string;
  responseToShow: string;

  format: string = '';

  ngOnInit() {
    this.communication.getRequest().subscribe(
      data => {
        this.requestToShow = this.conversor.generarFormatRequest(data);
        this.format = this.requestToShow;
      }
    );

    this.communication.getResponse().subscribe(
      data => {
        this.responseToShow = this.conversor.generarFormatResponse(data);
        this.format = this.format + this.responseToShow;
      }
    );    
  }

  copy(event) {
    //  let clip = new ClipboardEvent(this.format);
    //  let data = ClipboardEvent;
    // let clip = event.ClipboardEvent;

    let clip = new ClipboardEvent('copy');
    
    
    // asdsadadclip.clipboardData.setData('hola','text/plain')
    // pasteEvent.clipboardData.items.add('My string', 'text/plain');
    // document.dispatchEvent(pasteEvent);
    
    // console.log(clip);
    this.openSnackBar('Format')
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Copiado', {
      duration: 2000,
    });
  }

}