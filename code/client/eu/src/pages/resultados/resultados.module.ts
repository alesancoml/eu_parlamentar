import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Resultados } from './resultados';

@NgModule({
  declarations: [
    Resultados,
  ],
  imports: [
    IonicPageModule.forChild(Resultados),
  ],
})
export class ResultadosModule {}
