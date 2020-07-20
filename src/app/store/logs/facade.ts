import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as state from './state';
import * as selectors from './selectors';
import * as actions from './actions';
import { Log } from '../../models';


@Injectable({
    providedIn: 'root'
})
export class LogsFacadeService {
    isLoading$: Observable<boolean>
    hasLoaded$: Observable<boolean>
    logs$: Observable<Log[]>
    last$: Observable<Log>
    editing$: Observable<any>

    constructor(private store$: Store<state.State>) {
        this.isLoading$ = this.store$.select(
            selectors.selectLogsIsLoading
        )
        this.hasLoaded$ = this.store$.select(
            selectors.selectLogsHasLoaded
        )
        this.logs$ = this.store$.select(
            selectors.selectAllItems
        )
        this.last$ = this.store$.select(
            selectors.selectLast()
        )
    }

    load(limit?) {
        this.store$.dispatch(new actions.LoadRequest({limit}))
    }
    // create(log) {
    //     this.store$.dispatch(new actions.CreateRequest({ log }))
    // }
}
