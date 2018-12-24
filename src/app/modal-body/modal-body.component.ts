import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-body',
  templateUrl: './modal-body.component.html',
  styleUrls: ['./modal-body.component.scss']
})
export class ModalBodyComponent {

  constructor(public thisDialogRef: MatDialogRef<ModalBodyComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

}
