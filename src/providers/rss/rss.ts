import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { FeedItem } from '../../models/FeedItem';


@Injectable()
export class RssProvider {

  constructor(public http: HttpClient) {  }

  //obtiene los feeds de RTVE y los guarda en objetos FeedItem
  getRtveRssFeeds(): Observable<Array<FeedItem>>{

    const url_feeder = 'http://www.rtve.es/api/noticias.json';

    let response = this.http.get(url_feeder).map(
      res => this.mapToRtveFeeds(res)
    );

    return response;
  }

  private mapToRtveFeeds(res: Object): any {
    return res["page"]["items"].map(item => {
      return new FeedItem(
          item["title"], 
          item["summary"], 
          item["image"], 
          item["text"], 
          item["htmlShortUrl"], 
          item["publicationDateTimestamp"]);
    });
  }
}
