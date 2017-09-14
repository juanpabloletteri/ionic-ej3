import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AplicacionPage } from './aplicacion';

@NgModule({
  declarations: [
    AplicacionPage,
  ],
  imports: [
    IonicPageModule.forChild(AplicacionPage),
  ],
})
export class AplicacionPageModule {}
