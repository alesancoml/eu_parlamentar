import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Estado } from './estado';

@NgModule({
  declarations: [
    Estado,
  ],
  imports: [
    IonicPageModule.forChild(Estado),
  ],
})
export class EstadoModule {}
