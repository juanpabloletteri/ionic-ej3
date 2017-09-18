import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AplicacionPage } from '../aplicacion/aplicacion';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario: string;
  email: string;
  pass: string;

  usuarios: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, db: AngularFireDatabase, ) {
    this.usuarios = db.list('/usuarios');
    console.log(this.usuarios);
  }
  login() {
    this.usuarios.forEach(element => {
      for (var i = 0; i < 5; i++) {
        if (element[i].nombre == this.usuario && element[i].clave == this.pass) {
          //SE ENCONTRO USUARIO
          let alert = this.alertCtrl.create({
            title: 'Bienvenido: ' + this.usuario,
            buttons: ['OK']
          });
          alert.present();
          //Redirijo a la pagina correspondiente
          this.navCtrl.push(AplicacionPage, { "usuario": this.usuario, "email": this.email });
          return;
        }
      }
      //NO SE ENCONTRO USUARIO
      let alert = this.alertCtrl.create({
        title: 'No se encontro el usuario',
        subTitle: 'Usuario o contraseña incorrectos, por favor verifique!',
        buttons: ['OK']
      });
      alert.present();
    })
    /*VERIFICACION FICTICIA
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
      this.usuario = "";
      this.email = "";
      this.pass = "";
    }*/
  }
}
