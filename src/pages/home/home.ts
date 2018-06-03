import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RssProvider } from '../../providers/rss/rss';
import { FeedItem } from '../../models/FeedItem';
import { ArrayUtilProvider } from '../../providers/array-util/array-util';
import { FeedDetailPage } from '../feed-detail/feed-detail';
import { StorageProvider } from '../../providers/storage/storage';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private rssData: Array<FeedItem>;

  private readonly storageKey = 'feedItems';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public rssProvider: RssProvider,
              public arrayUtilProvider: ArrayUtilProvider,
              public storageProvider: StorageProvider) {
  }

  ionViewDidLoad() {
    this.getRssData();
  }

  getRssData(){
    this.rssProvider.getRtveRssFeeds().subscribe(
      data => {
        //se obtienen los datos y se ordenan por fecha de manera inversa (de más reciente a más lejana)
        this.rssData = this.arrayUtilProvider.sortItems(data, "date", true); 
        this.storageProvider.saveData(this.storageKey, this.rssData);
        console.log(data);
      },
      error => {
        console.log(<any>error);
        this.storageProvider.getDataByKey(this.storageKey).then(
          feedItems => {
            this.rssData = feedItems;
          }
        );
      }
    );
  }


  navToDetailsPage(item: FeedItem){
    this.navCtrl.push(FeedDetailPage, {
      item: item
    });
  }

}
