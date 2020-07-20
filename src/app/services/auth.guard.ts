import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { tap, map, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { RootStoreState, NavigationStoreActions, AuthStoreSelectors } from '../store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router, private store$: Store<RootStoreState.State>) { }

  canActivate(): Observable<boolean> {
    return this.store$.pipe(
      select(AuthStoreSelectors.selectAuthenticated),
      map(authed=>{
        if(!authed){
          this.store$.dispatch(new NavigationStoreActions.GoTo({ path: ['login'] }));
          return false;
        }
        return true;
      }),
      take(1)
    )
  }
}
