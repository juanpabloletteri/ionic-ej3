import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { AplicacionPage } from '../pages/aplicacion/aplicacion';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyAt0lqFHmt_L7hGr1p0VVpnE1vi4xFm8sA",
  authDomain: "ej03-39c5f.firebaseapp.com",
  databaseURL: "https://ej03-39c5f.firebaseio.com",
  projectId: "ej03-39c5f",
  storageBucket: "ej03-39c5f.appspot.com",
  messagingSenderId: "26965923064"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    AplicacionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    AplicacionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
