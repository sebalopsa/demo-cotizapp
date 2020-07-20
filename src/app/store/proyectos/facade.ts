import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Proyecto } from '../../models';

import * as state from './state';
import * as selectors from './selectors';
import * as actions from './actions';

@Injectable({
    providedIn: 'root'
})
export class ProyectosFacadeService {
    isLoading$: Observable<boolean>
    hasLoaded$: Observable<boolean>
    proyectos$: Observable<Proyecto[]>
    proyecto$: Observable<Proyecto>

    constructor(private store$: Store<state.State>) {
        this.isLoading$ = this.store$.select(
            selectors.selectProyectosIsLoading
        )
        this.hasLoaded$ = this.store$.select(
            selectors.selectProyectosHasLoaded
        )
        this.proyectos$ = this.store$.select(
            selectors.selectAllItems
        )
        this.proyecto$ = this.store$.select(
            selectors.selectProyectosByIdInRouter()
        )
    }

    load() {
        this.store$.dispatch(new actions.LoadRequest())
    }
    create(proyecto) {
        this.store$.dispatch(new actions.CreateRequest({ proyecto: proyecto }))
    }
    update(id, proyecto) {
        this.store$.dispatch(new actions.UpdateRequest({ id: id, proyecto: proyecto }))
    }
    delete(proyecto) {
        this.store$.dispatch(new actions.DeleteRequest({ id: proyecto.id }))
    }
}
