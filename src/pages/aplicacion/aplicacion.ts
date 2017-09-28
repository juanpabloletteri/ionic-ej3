import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { HomePage } from '../home/home';
/**
 * Generated class for the AplicacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aplicacion',
  templateUrl: 'aplicacion.html',
})
export class AplicacionPage {

  usuario: string;
  perfil: string;
  email: string;
  yaVoto: boolean;
  voto: number = null;
  votoA: number = 0;
  votoB: number = 0;
  cantVotos: number = 0;

  esAdmin: boolean = false;

  opcion1: string;
  opcion2: string;
  nuevaOpcion1: string;
  nuevaOpcion2: string;

  usuarios: FirebaseListObservable<any>;
  votos: FirebaseListObservable<any>;
  opciones: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.usuario = this.navParams.get('usuario');
    this.perfil = this.navParams.get('perfil');
    this.esAdmin = false;

    let loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 1500
    });
    loader.present();

    if (this.perfil == 'admin') {
      this.esAdmin = true;
    }
    this.usuarios = db.list('/usuarios');
    this.opciones = db.list('/opciones');
    this.votos = db.list('/votos');

    //this.opcion1 = this.opciones[0].opcion1;
    this.opciones.forEach(element => {
      this.opcion1 = element[0].opcion1;
      this.opcion2 = element[0].opcion2;
    })

    this.votos.forEach(element => {
      for (var i = 0; i < 5; i++) {
        if (element[i].nombre == this.usuario) {
          this.usuario = element[i].nombre;
          this.yaVoto = element[i].yaVoto;
          this.voto = element[i].voto;
        }
      }
    });
    //CUENTO LA CANTIDAD DE VOTOS AL MOMENTO
    /*this.votos.forEach(element => {
      for (var i = 0; i < 5; i++) {
        if (element[i].voto == 1) {
          this.votoA++;
          this.cantVotos++;
        }
        else if (element[i].voto == 2) {
          this.votoB++;
          this.cantVotos++;
        }
      }
    });*/
    this.contarVotos();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AplicacionPage');
  }

  votar() {
    this.votos.update(this.usuario, { voto: this.voto, yaVoto: 1 });

    const toast = this.toastCtrl.create({
      message: 'Su voto ha sido registrado correctamente',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();

    this.contarVotos();
  }

  reiniciarVotacion() {
    this.votos.forEach(element => {
      for (var i = 0; i < 5; i++) {
        this.votos.update(element[i].nombre, { voto: 0, yaVoto: 0 });
      }
    });
    this.navCtrl.pop();
  }
  establecerNuevasOpciones() {
    this.opciones.update('op', { opcion1: this.nuevaOpcion1, opcion2: this.nuevaOpcion2 });

    const toast = this.toastCtrl.create({
      message: 'Se han cambiado las opciones de votacion exitosamente',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();

    this.reiniciarVotacion();
  }

  contarVotos() {
    this.votoA = 0;
    this.votoB = 0;
    this.cantVotos = 0;
    this.votos.forEach(element => {
      for (var i = 0; i < 5; i++) {
        if (element[i].voto == 1) {
          this.votoA++;
          this.cantVotos++;
        }
        else if (element[i].voto == 2) {
          this.votoB++;
          this.cantVotos++;
        }
      }
    });
  }
}
