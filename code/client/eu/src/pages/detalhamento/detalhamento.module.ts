import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Detalhamento } from './detalhamento';

@NgModule({
  declarations: [
    Detalhamento,
  ],
  imports: [
    IonicPageModule.forChild(Detalhamento),
  ],
})
export class DetalhamentoModule {}
