import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as state from './state';
import * as selectors from './selectors';
import * as actions from './actions';
import { Cliente } from 'src/app/models';

@Injectable({
    providedIn: 'root'
})
export class ClientesFacadeService {

    clientes$: Observable<any>;
    loading$: Observable<boolean>;
    hasLoaded$: Observable<boolean>;
    count$: Observable<number>;
    temp$: Observable<Cliente>;
    editing$: Observable<boolean>;

    constructor(private store$: Store<state.State>) {
        this.clientes$ = this.store$.select(
            selectors.selectAllClientes
        )
        this.loading$ = this.store$.select(
            selectors.selectIsLoading
        )
        this.hasLoaded$ = this.store$.select(
            selectors.selectHasLoaded
        )
        this.count$ = this.store$.select(
            selectors.selectCounter
        )
        this.temp$ = this.store$.select(
            selectors.selectTemp
        )
        this.editing$ = this.store$.select(
            selectors.selectEditing
        )
    }

    loadItems() {
        this.store$.dispatch(new actions.LoadItems())
    }

    addNew() {
        this.store$.dispatch(new actions.AddNew())
    }

    editOne(cliente: Cliente) {
        this.store$.dispatch(new actions.EditOne(cliente))
    }

    formChanged(changes: Cliente) {
        this.store$.dispatch(new actions.FormChanged(changes))
    }

    discardChanges() {
        this.store$.dispatch(new actions.DiscardChanges())
    }
    
    saveChanges() {
        this.store$.dispatch(new actions.SaveChanges())
    }

    deleteOne(id:string) {
        this.store$.dispatch(new actions.DeleteOne(id))
    }

}
