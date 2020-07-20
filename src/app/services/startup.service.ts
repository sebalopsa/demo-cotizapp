import { Injectable } from '@angular/core';
import { takeWhile, first, take, skip, skipWhile } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RootStoreState, AuthStoreActions, AuthStoreSelectors } from '../store';

@Injectable({
   providedIn: 'root'
})
export class StartupService {

   constructor(private store: Store<RootStoreState.State>) { }

   checkAuthState(): Promise<any> {
      return new Promise((resolve) => {
         this.store.select(AuthStoreSelectors.selectAuthenticated)
            .pipe(
               skipWhile(auth => auth == undefined),
               first()
            )
            .subscribe(auth => {
               resolve(true);
            });
         this.store.dispatch(new AuthStoreActions.GetAuthState())
      })
   }
}