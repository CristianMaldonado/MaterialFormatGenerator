import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Utils } from './utils/Utils';
import { CommunicationService } from './servicios/communication.service';

//Material
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { 
  MatButtonModule, 
  MatCheckboxModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatStepperModule,
  MatTabsModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatTableModule,
  MatDialogModule,
  MatSnackBarModule
} from '@angular/material';
import { ModalBodyComponent } from './modal-body/modal-body.component';
import { InputTagValuesComponent } from './input/components/input-tag-values/input-tag-values.component';
import { DatosEntradaComponent } from './input/containers/datos-entrada/datos-entrada.component';
import { BeanRequestComponent } from './output/components/bean-request/bean-request.component';
import { BeanResponseComponent } from './output/components/bean-response/bean-response.component';
import { FormatComponent } from './output/components/format/format.component';
import { SchemaComponent } from './output/components/schema/schema.component';
import { VjsonComponent } from './output/components/vjson/vjson.component';




@NgModule({
  declarations: [
    AppComponent,
    ModalBodyComponent,
    ModalBodyComponent,
    InputTagValuesComponent,
    DatosEntradaComponent,
    BeanRequestComponent,
    BeanResponseComponent,
    FormatComponent,
    SchemaComponent,
    VjsonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    CommunicationService,
    Utils
  ],
  entryComponents: [ModalBodyComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
