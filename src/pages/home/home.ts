import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare const gapi : any;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

	private disabled : boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.disabled = false;
  }

  signIn(){

        this.navCtrl.push('SummaryPage');
        }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
