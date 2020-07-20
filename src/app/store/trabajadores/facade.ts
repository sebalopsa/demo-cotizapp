import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as state from './state';
import * as selectors from './selectors';
import * as actions from './actions';
import { Trabajador } from 'src/app/models';


@Injectable({
    providedIn: 'root'
})
export class TrabajadoresFacadeService {

    loading$: Observable<boolean>;
    hasLoaded$: Observable<boolean>;
    trabajadores$: Observable<any>;
    trabajador$: Observable<Trabajador>;

    constructor(private store$: Store<state.State>) {
        this.loading$ = this.store$.select(
            selectors.selectIsLoading
        )
        this.hasLoaded$ = this.store$.select(
            selectors.selectHasLoaded
        )
        this.trabajadores$ = this.store$.select(
            selectors.selectAllItems
        )
        this.trabajador$ = this.store$.select(
            selectors.selectTrabajadorByIdInRouter()
        )
    }

    load() {
        this.store$.dispatch(new actions.LoadRequest())
    }
    create(trabajador) {
        this.store$.dispatch(new actions.CreateRequest({trabajador}))
    }
    update(rut, changes){
        this.store$.dispatch(new actions.UpdateRequest({rut, changes}))
    }
    delete(rut){
        this.store$.dispatch(new actions.DeleteRequest({rut}))
    }

}
