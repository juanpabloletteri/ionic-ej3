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
  perfil: string;

  pass1: string;
  pass2: string;

  esUsuario: boolean = true;
  usuarios: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, db: AngularFireDatabase, ) {
    this.usuarios = db.list('/usuarios');
  }
  login() {
    this.usuarios.forEach(element => {
      for (let i in element) {
        console.log(i);
        if (element[i].nombre == this.usuario && element[i].clave == this.pass) {
          //SE ENCONTRO USUARIO
          this.usuario = element[i].nombre;
          this.perfil = element[i].perfil;

          let alert = this.alertCtrl.create({
            title: 'Bienvenido: ' + this.usuario,
            buttons: ['OK']
          });
          alert.present();
          //Redirijo a la pagina correspondiente
          this.navCtrl.push(AplicacionPage, { "usuario": this.usuario, "perfil": this.perfil });
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
  asignarUsuario(tipo) {
    switch (tipo) {
      case "admin": {
        this.usuario = "admin";
        this.pass = "11";
        break;
      }
      case "invitado": {
        this.usuario = "invitado";
        this.pass = "22";
        break;
      }
      case "usuario": {
        this.usuario = "usuario";
        this.pass = "33";
        break;
      }
      case "j1": {
        this.usuario = "j1";
        this.pass = "44";
        break;
      }
      case "j2": {
        this.usuario = "j2";
        this.pass = "55";
        break;
      }
    }
  }
}
