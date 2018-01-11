import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Perguntas } from './perguntas';

@NgModule({
  declarations: [
    Perguntas,
  ],
  imports: [
    IonicPageModule.forChild(Perguntas),
  ],
})
export class PerguntasModule {}
