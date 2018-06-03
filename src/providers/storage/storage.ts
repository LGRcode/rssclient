import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FeedItem } from '../../models/FeedItem';


@Injectable()
export class StorageProvider {

  constructor(public storage: Storage) {  }

  public saveData(key: string , feedItems: Array<FeedItem>): Promise<void> {
    return this.storage.set(key, feedItems);
  }

  public getDataByKey(key: string): Promise<Array<FeedItem>> {
    return this.storage.get(key);
}

}
