import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

  put(reference, item) {
    return this.storage.ref(reference).put(item)
  }

  putString(reference, dataUrl) {
    return this.storage.ref(reference).putString(dataUrl)
  }

  delete(url){
    // return this.storage.ref(ref).delete()
    return this.storage.storage.refFromURL(url).delete()
  }
}
