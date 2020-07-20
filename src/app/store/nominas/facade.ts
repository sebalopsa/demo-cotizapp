import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as state from './state';
import * as selectors from './selectors';
import * as actions from './actions';
import { NominaMensual } from 'src/app/models';


@Injectable({
    providedIn: 'root'
})
export class NominasFacadeService {

    loading$: Observable<boolean>;
    hasLoaded$: Observable<boolean>;
    nominas$: Observable<NominaMensual[]>;

    constructor(private store$: Store<state.State>) {
        this.loading$ = this.store$.select(
            selectors.selectIsLoading
        )
        this.hasLoaded$ = this.store$.select(
            selectors.selectHasLoaded
        )
        this.nominas$ = this.store$.select(
            selectors.selectAllItems
        )
    }

    load() {
        this.store$.dispatch(new actions.LoadRequest())
    }
    create(nomina) {
        this.store$.dispatch(new actions.CreateRequest({nomina}))
    }
    delete(id){
        this.store$.dispatch(new actions.DeleteRequest({id}))
    }

}
