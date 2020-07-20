import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, public firebase: FirebaseApp) {
  }


  authState() {
    return this.afAuth.authState;
  }

  currentUser() {
    return this.afAuth.auth.currentUser;
  }

  login({username, password}) {
    return this.afAuth.auth.setPersistence("session").then(
      () => { return this.afAuth.auth.signInWithEmailAndPassword(username, password) }
    )
  }

  logout() {
    return this.afAuth.auth.signOut()
  }
}
