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

  private readonly storageKey = 'feedItems';

  private rssData: Array<FeedItem>;
   //se guarda la lista completa para poder restaurarla al hacer búsquedas
  private fullRssData: Array<FeedItem>;

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
        this.fullRssData = this.rssData;
        this.storageProvider.saveData(this.storageKey, this.rssData);
        console.log(data);
      },
      error => {
        console.log(<any>error);
        //en caso de error intenta obtener el listado que se haya guardado en BBDD
        this.storageProvider.getDataByKey(this.storageKey).then(
          feedItems => {
            this.rssData = feedItems;
            this.fullRssData = feedItems;
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

  searchFeeds(ev: any) {
    
    //lo primero se restaura la lista con todos los elementos
    this.rssData = this.fullRssData; 
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.rssData = this.arrayUtilProvider.searchItemsByStringField(this.rssData, "title", val);
    }
  }

}
