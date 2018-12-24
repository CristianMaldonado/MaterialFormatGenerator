import { ResponseStruct } from '../../../estructuras/response';
import { MapValues } from '../../../estructuras/map.values';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { RequestStruct } from '../../../estructuras/request';
import { ResponseRowset } from '../../../estructuras/responseRowset';
import { MatDialog } from '@angular/material';
import { ModalBodyComponent } from '../../../modal-body/modal-body.component';
import { CommunicationService } from 'src/app/servicios/communication.service';

@Component({
  selector: 'app-datos-entrada',
  templateUrl: './datos-entrada.component.html',
  styleUrls: ['./datos-entrada.component.scss']
})
export class DatosEntradaComponent {

  //REQUEST
  idRequest: string = '';
  requestName: string = '';
  posicionDeElementoRequest: number = 0;

  //RESPONSE
  tieneRowset: boolean = false;
  rowsetClass: string = '';
  responseDataClass: string = '';
  idResponse: string = '';
  posicionDeElementoResponse: number = 0;
  posicionDeElementoResponseRowset: number = 0;

  //GENERALES
  editar: boolean = false;
  remover: boolean[] = [];

  //ESTA ES LA LISTA DE TAGS PARA FORMATEAR
  requestTags: MapValues[] = [];
  responseTags: MapValues[] = [];
  responseRowset: MapValues[] = [];


  @ViewChild(MatSort) sort: MatSort;

  constructor(private communication: CommunicationService, public dialog: MatDialog) { }

  displayedColumns = ['tags'];
  dataSourceRequest = new MatTableDataSource(this.requestTags);
  dataSourceResponse = new MatTableDataSource(this.responseTags);
  dataSourceResponseRowset = new MatTableDataSource(this.responseRowset);

  /**
   * Organiza los datos y los despacha con un servicio para que los 
   * reciba otro componente
   */
  sendInfoToFormat() {
    if(this.isAnyInputEmpty) {
      console.log(this.getWhoIsEmpty());
      this.openDialog();
    }else {
      let requestToConvert: RequestStruct = new RequestStruct();
      let response: ResponseStruct = new ResponseStruct();
      let responseRowset: ResponseRowset = new ResponseRowset();

      requestToConvert.idRequest = this.idRequest;
      requestToConvert.data = this.requestTags;
      requestToConvert.request = this.requestName;

      response.idResponse = this.idResponse;
      response.data = this.responseTags;
      response.responseClassName = this.responseDataClass;

      if(this.tieneRowset) {
        responseRowset.rowset = this.responseRowset;
        responseRowset.rowsetClassName = this.rowsetClass;
        response.rowset = responseRowset;        
        response.tieneRowset = true;
      }else {
        response.rowset = null;
        response.tieneRowset = false;
      }

      this.communication.notificarRequest(requestToConvert);    
      this.communication.notificarResponse(response);
    } 
  }
  
  /**
   * Dado el datasource y una pababra de busqueda, filtra los resultados que 
   * machean con la palabra buscada en la tabla
   * @param dataSource 
   * @param filterValue 
   */
  applyFilter(dataSource: MatTableDataSource<MapValues>, filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    dataSource.filter = filterValue;
  }

  /**
   * Agrega un elemento a la lista para mostrarlo por la tabla
   * @param newLine 
   */
  addValueToTable(array: string, newLine: MapValues) {   
    switch(array){
      case 'request':
        this.posicionDeElementoRequest = this.posicionDeElementoRequest + 1; 
        newLine.posicion = this.posicionDeElementoRequest;
        this.requestTags.push(newLine);
      break;
      case 'response':
        this.posicionDeElementoResponse = this.posicionDeElementoResponse + 1; 
        newLine.posicion = this.posicionDeElementoResponse;
        this.responseTags.push(newLine);
      break;
      case 'responseRowset': 
        this.posicionDeElementoResponseRowset = this.posicionDeElementoResponseRowset + 1; 
        newLine.posicion = this.posicionDeElementoResponseRowset;
        this.responseRowset.push(newLine);
      break;
    }
    this.refreshTable();
  }

  /**
   * Dada la posicion del objeto en la tabla lo quita de la lista
   * @param posicion 
   */
  removeValueFromList(array: string, posicion: number): void {
    let p;
    switch(array){
      case 'request':
        p = this.buscarPosicionEnArray(this.requestTags, posicion);
        if(this.requestTags[p].remover){
          this.requestTags.splice(p, 1);
        }
      break;
      case 'response':
        p = this.buscarPosicionEnArray(this.responseTags, posicion);        
        if(this.responseTags[p].remover){
          this.responseTags.splice(p, 1);
        }
      break;
      case 'responseRowset':
        p = this.buscarPosicionEnArray(this.responseRowset, posicion);
        if(this.responseRowset[p].remover){
          this.responseRowset.splice(p, 1);
        }
      break;
    }
    this.refreshTable();   
  }

  /**
   * Dada la posicion del elemento en la tabla, toma el elemento y lo coloca
   * en los inputs para su edicion
   * @param array
   * @param posicion
   */
  editValueFromList(array: string, posicion: number): void {
    let pos;
    switch(array){
      case 'request':
        pos = this.buscarPosicionEnArray(this.requestTags, posicion);
      break;
      case 'response':
        pos = this.buscarPosicionEnArray(this.responseTags, posicion);
      break;
      case 'responseRowset':
        pos = this.buscarPosicionEnArray(this.responseRowset, posicion);
      break;
    }
  }

  /**
   * Dado el valor de posicion en la tabla html encuentra y devuelve la posicion
   * real del objeto en el array
   * @param posicionEnTabla 
   */
  private buscarPosicionEnArray(array: MapValues[], posicionEnTabla: number): number {
    return array.findIndex( e => e.posicion == posicionEnTabla);
  }

  private refreshTable() {
    this.dataSourceRequest.sort = this.sort;
    this.dataSourceResponse.sort = this.sort;
    this.dataSourceResponseRowset.sort = this.sort;
  }

  /**
   * Limpia las listas y refresca las tablas para que se limpien los datos de la pantalla
   */
  cleanInputs() {
    this.idRequest = '';
    this.requestName = '';
    this.posicionDeElementoRequest = 0;
    this.tieneRowset = false;
    this.rowsetClass = '';
    this.responseDataClass = '';
    this.idResponse = '';
    this.posicionDeElementoResponse = 0;
    this.posicionDeElementoResponseRowset = 0;
    this.requestTags = [];
    this.responseTags = [];
    this.responseRowset = [];
    this.dataSourceRequest = new MatTableDataSource(this.requestTags);
    this.dataSourceResponse = new MatTableDataSource(this.responseTags);
    this.dataSourceResponseRowset = new MatTableDataSource(this.responseRowset);
    this.refreshTable();
  }
  
  get isAnyInputEmpty(): boolean {
    return (
            this.idRequest.trim() == '' || 
            this.requestName.trim() == '' || 
            this.responseDataClass.trim() == '' || 
            this.idResponse.trim() == '' || 
            (this.tieneRowset && this.rowsetClass.trim() == '')
          );
  }

  getWhoIsEmpty(): string {
    if(this.idRequest.trim() == '') return 'ID Request';
    if(this.requestName.trim() == '') return 'Nombre Request';
    if(this.tieneRowset && this.rowsetClass.trim() == '') return 'Clase Rowset';
    if(this.responseDataClass.trim() == '') return 'Nombre de la clase Response';
    if(this.idResponse.trim() == '') return 'ID Response';
  }

  dialogResult: string = '';

      
  openDialog() {
    let dialogRef = this.dialog.open(ModalBodyComponent, {
      width: '600px',
      data: this.getWhoIsEmpty()
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(`Dialog closed: ${res}`);
      this.dialogResult = res;
    });
  }

}

