import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

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
  email: string;
  yaVoto: boolean = true;
  voto: string;

  votos: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase) {
    this.usuario = this.navParams.get('usuario');
    this.email = this.navParams.get('email');

    this.votos = db.list('/votos');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AplicacionPage');
  }

  votar() {

  }

  mostrarVotos() {

  }
}
