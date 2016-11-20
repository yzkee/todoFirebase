import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
// Importing pages
import { HomePage } from '../pages/home/home';
import { Home2Page } from '../pages/home2/home2';
import { CompletedPage } from '../pages/completed/completed';
 
// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
 
// AF2 Settings
export const firebaseConfig = {
 apiKey: "AIzaSyB1F2LFlcCR9928UGNdlHje58bje9gbR-c",
    authDomain: "todofirebase-79787.firebaseapp.com",
    databaseURL: "https://todofirebase-79787.firebaseio.com",
    storageBucket: "todofirebase-79787.appspot.com",
    messagingSenderId: "696227070017"
};
 
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Home2Page,
    CompletedPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Home2Page,
    CompletedPage
  ],
  providers: [
  ]
})
export class AppModule {}