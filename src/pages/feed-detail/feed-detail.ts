import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedItem } from '../../models/FeedItem';


@IonicPage()
@Component({
  selector: 'page-feed-detail',
  templateUrl: 'feed-detail.html',
})
export class FeedDetailPage {

  private feedItem: FeedItem;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.feedItem = navParams.get('item'); 
    console.log(this.feedItem);
  }

}
