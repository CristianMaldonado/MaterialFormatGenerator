import { MapValues } from '../../../estructuras/map.values';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-tag-values',
  templateUrl: './input-tag-values.component.html',
  styleUrls: ['./input-tag-values.component.scss']
})
export class InputTagValuesComponent implements OnInit {

  tag: string = '';
  value: string = '';
  igualarTagConValue: boolean = true;  
  soloTag: string = '';

  @Output() addToTable: EventEmitter<MapValues> = new EventEmitter<MapValues>();

  enviarATabla(e) {
    if(e.keyCode ==13){
      let elemento: MapValues = new MapValues();
      if(this.igualarTagConValue){
        elemento.tag = this.soloTag.trim();
        elemento.atributo = this.soloTag.trim();
        this.addToTable.emit(elemento);
        this.soloTag='';        
      }else {
        elemento.atributo = this.value.trim();
        elemento.tag = this.tag.trim();
        this.addToTable.emit(elemento);
        this.value = '';
        this.tag = '';
      }
    }
    
  }
  constructor() { }

  ngOnInit() {
  }

}
