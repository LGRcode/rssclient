import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RssProvider } from '../../providers/rss/rss';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public rssProvider: RssProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
