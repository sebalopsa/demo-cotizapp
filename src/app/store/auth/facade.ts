import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as state from './state';
import * as selectors from './selectors';
import * as actions from './actions';
import { User } from 'src/app/models';


@Injectable({
    providedIn: 'root'
})
export class AuthFacadeService {
    user$: Observable<User>;
    error$: Observable<string>;
    isLoading$: Observable<boolean>;

    constructor(private store$: Store<state.State>) {
        this.user$ = this.store$.select(
            selectors.selectAuthUser
        )
        this.error$ = this.store$.select(
            selectors.selectAuthError
        );
        this.isLoading$ = this.store$.select(
            selectors.selectAuthIsLoading
        );
    }

    logout() {
        this.store$.dispatch(new actions.Logout())
    }

    login(username, password) {
        this.store$.dispatch(new actions.Login({ username, password }));
    }
}
