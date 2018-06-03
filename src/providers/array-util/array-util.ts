import { Injectable } from '@angular/core';
import { FeedItem } from '../../models/FeedItem';


@Injectable()
export class ArrayUtilProvider {

  constructor() {  }

  sortItems(items: Array<any>, field: string, reverse?: boolean){

    let order = reverse ? -1 : 1;
    return items.sort((feedA: FeedItem , feedB: FeedItem ) =>
        {
          if(feedA[field] > feedB[field]){
            return 1 * order;
          } else if(feedA.date < feedB.date) {
            return -1 * order;
          } else {
            return 0;
          }
        }
        )
  }

}
