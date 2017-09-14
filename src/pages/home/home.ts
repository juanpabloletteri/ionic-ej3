import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AplicacionPage } from '../aplicacion/aplicacion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario: string;
  email:string;
  pass: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }
  login() {
    if (this.usuario == "admin" && this.pass == "admin") {
      let alert = this.alertCtrl.create({
        title: 'Usuario valido!' + this.usuario,
        subTitle: 'Bienvenido a la aplicacion!',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.push(AplicacionPage, { "usuario": this.usuario, "pass": this.pass });

    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Usuario no valido!',
        subTitle: 'Por favor registrese',
        buttons: ['NO']
      });
      alert.present();
      this.usuario="";
      this.email="";
      this.pass="";
    }
  }
}
