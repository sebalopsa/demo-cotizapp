import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as state from './state';
import * as selectors from './selectors';
import * as actions from './actions';
import { TrabajadorDocumento } from 'src/app/models';


@Injectable({
    providedIn: 'root'
})
export class TrabajadoresDocumentosFacadeService {

    loading$: Observable<boolean>;
    hasLoaded$: Observable<boolean>;
    trabajadoresDocumentos$: Observable<TrabajadorDocumento[]>;
    trabajadorDocumentos$: Observable<TrabajadorDocumento[]>;
    trabajadoresDocumentosPorVencer$: Observable<TrabajadorDocumento[]>;


    constructor(private store$: Store<state.State>) {
        this.loading$ = this.store$.select(
            selectors.selectIsLoading
        )
        this.hasLoaded$ = this.store$.select(
            selectors.selectHasLoaded
        )
        this.trabajadoresDocumentos$ = this.store$.select(
            selectors.selectAllItems
        )
        this.trabajadorDocumentos$ = this.store$.select(
            selectors.selectDocumentoByTrabajadorIdInRouter()
        )
        this.trabajadoresDocumentosPorVencer$ = this.store$.select(
            selectors.selectDocumentosPorVencer()
        )
    }

    load() {
        this.store$.dispatch(new actions.LoadRequest())
    }
    create(rut, documento, file) {
        this.store$.dispatch(new actions.CreateRequest({ rut, documento, file }))
    }
    delete(id) {
        this.store$.dispatch(new actions.DeleteRequest({ id }))
    }

}
