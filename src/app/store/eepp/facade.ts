import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as state from './state';
import * as selectors from './selectors';
import * as actions from './actions';
import { EstadoPago } from 'src/app/models';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class EeppFacadeService {

    loading$: Observable<boolean>;
    hasLoaded$: Observable<boolean>;
    eepp$: Observable<any>;
    count$: Observable<number>;
    lastFolio$: Observable<number>;
    nuevoEstadoPago$: Observable<any>;

    constructor(private store$: Store<state.State>) {
        this.loading$ = this.store$.select(
            selectors.selectIsLoading
        )
        this.hasLoaded$ = this.store$.select(
            selectors.selectHasLoaded
        )
        this.eepp$ = this.store$.select(
            selectors.selectAllItems
        ).pipe(
            map(list => list.map(c => {
                if (c.cliente) {
                    const nombreCliente = c.cliente.nombre
                    return { ...c, nombreCliente }
                }
                else return;
            }))
        )
        this.count$ = this.store$.select(
            selectors.selectCount
        )
        this.nuevoEstadoPago$ = this.store$.select(
            selectors.selectNuevoEstadoPago
        )
        this.lastFolio$ = this.store$.select(
            selectors.selectLastFolio
        )
    }

    loadItems() {
        this.store$.dispatch(new actions.LoadItems())
    }

    initializeBlankDraft(ep?: EstadoPago) {
        this.store$.dispatch(new actions.InitializeBlankDraft())
    }

    initializeDraftFromPrevious(ep: EstadoPago) {
        this.store$.dispatch(new actions.InitializeDraftFromPrevious(ep))
    }

    closeDraftEditor() {
        this.store$.dispatch(new actions.CloseDraftEditor())
    }

    mergeFormChanges(formValue) {
        this.store$.dispatch(new actions.MergeFormChanges(formValue))
    }

    mergeClienteSelection(cliente) {
        this.store$.dispatch(new actions.MergeClienteSelection(cliente))
    }

    openClienteSelector() {
        this.store$.dispatch(new actions.OpenClienteSelector())
    }

    closeClienteSelector() {
        this.store$.dispatch(new actions.CloseClienteSelector())
    }

    showPreview() {
        this.store$.dispatch(new actions.ShowPreview())
    }

    generateDocument() {
        this.store$.dispatch(new actions.GenerateDocument())
    }

    updateFirestoreDocument(folio, changes) {
        this.store$.dispatch(new actions.UpdateFirestoreDocument({ folio, changes }))
    }


}
