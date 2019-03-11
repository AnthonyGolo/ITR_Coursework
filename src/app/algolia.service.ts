import { Injectable } from '@angular/core';
import algoliasearch from 'algoliasearch';

@Injectable({
  providedIn: 'root'
})
export class AlgoliaService {

  client = algoliasearch('VZ7B6XU5J8', '5e47920804bc9e550e16c4e9a9fece27');

  constructor() { }

  addGuideToIndex(guide) {
    let index = this.client.initIndex('guides');
    index.addObject(guide, (err, content) => {
      if (err) console.error(err);
      console.log('objectID in index = ' + content.objectID)
    });
  }

  /*searchByInput(input: string) {
    let index = this.client.initIndex('guides');
    index.search(input, function(err, content) {
      console.log(content.hits);
    });
  }*/


}
