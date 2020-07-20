import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as state from './state';
import * as selectors from './selectors';
import * as actions from './actions';
import { Cotizacion } from 'src/app/models';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class CotizacionesFacadeService {

    loading$: Observable<boolean>;
    hasLoaded$: Observable<boolean>;
    cotizaciones$: Observable<any>;
    cotizacion$: Observable<any>;
    count$: Observable<number>;
    lastFolio$: Observable<number>;
    nuevaCotizacion$: Observable<any>;
    cotizacionSeleccionada: Cotizacion

    constructor(private store$: Store<state.State>) {
        this.loading$ = this.store$.select(
            selectors.selectIsLoading
        )
        this.hasLoaded$ = this.store$.select(
            selectors.selectHasLoaded
        )
        this.cotizaciones$ = this.store$.select(
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
        this.nuevaCotizacion$ = this.store$.select(
            selectors.selectNuevaCotizacion
        )
        this.lastFolio$ = this.store$.select(
            selectors.selectLastFolio
        )
      
    }

    loadItems() {
        this.store$.dispatch(new actions.LoadItems())
    }

    initializeBlankDraft(cotizacion?: Cotizacion) {
        this.store$.dispatch(new actions.InitializeBlankDraft())
    }

    initializeDraftFromPrevious(cotizacion: Cotizacion) {
        this.store$.dispatch(new actions.InitializeDraftFromPrevious(cotizacion))
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

    makePdfAndShow(cot) {
        this.store$.dispatch(new actions.makePdfAndShow(cot))
    }

    seleccionarCotizacion(cotizacion){
        this.cotizacionSeleccionada = cotizacion
    }

    resetCotizacion(){
        this.cotizacionSeleccionada = null
    }

}
