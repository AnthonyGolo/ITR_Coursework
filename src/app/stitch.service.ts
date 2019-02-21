import { Injectable } from '@angular/core';
import {
    Stitch,
    RemoteMongoClient,
    AnonymousCredential
} from 'mongodb-stitch-browser-sdk'

@Injectable({
  providedIn: 'root'
})
export class StitchService {

  constructor() {
    const client = Stitch.initializeDefaultAppClient('itrguidit-umsiz');

    const db = client.getServiceClient(RemoteMongoClient.factory, 'guidit-atlas').db('guiditDb');

    client.auth.loginWithCredential(new AnonymousCredential()).then(user =>
      db.collection('guides').updateOne({owner_id: client.auth.user.id}, {$set:{number:42}}, {upsert:true})
    ).then(() =>
      db.collection('guides').find({owner_id: client.auth.user.id}, { limit: 100}).asArray()
    ).then(docs => {
      console.log("Found docs", docs);
      console.log("[MongoDB Stitch] Connected to Stitch")
    }).catch(err => {
      console.error(err)
    });
  }
}
