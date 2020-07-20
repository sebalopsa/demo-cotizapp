import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf, from as fromPromise } from 'rxjs';
import { catchError, map, flatMap, switchMap } from 'rxjs/operators';
import { FirestoreService } from 'src/app/services/firestore.service';
import { NavigationStoreActions } from '../navigation';
import { LogsStoreActions } from '../logs';
import * as actions from './actions';

@Injectable()
export class ProyectosStoreEffects {
    constructor(
        private firestoreSrv: FirestoreService,
        private actions$: Actions,
    ) { }

    //cargar documentos desde db
    @Effect()
    loadRequest$: Observable<Action> = this.actions$.pipe(
        ofType<actions.LoadRequest>(
            actions.ActionTypes.LoadRequest
        ),
        switchMap(
            payload => this.firestoreSrv.getItems('proyectos').pipe(
                map(items => new actions.LoadSuccess({ items })),
                catchError(error => observableOf(new actions.LoadFailure({ error })))
            )
        )
    )

    //crear documento en db
    @Effect()
    create$: Observable<Action> = this.actions$.pipe(
        ofType<actions.CreateRequest>(
            actions.ActionTypes.CreateRequest
        ),
        map(action => action.payload.proyecto),
        switchMap(
            proyecto => fromPromise(this.firestoreSrv.create('proyectos', proyecto))
        ),
        flatMap(docRef => [
            new NavigationStoreActions.GoTo({ path: ['proyectos', docRef.id] }),
            new actions.CreateSuccess(),
            new LogsStoreActions.CreateRequest({
                tipo: 'CREAR',
                coleccion: 'proyectos',
                documento: docRef.id
            })
        ]),
        catchError(error => observableOf(new actions.CreateFailure({ error }))),
    );

    //actualizar documento en db
    @Effect()
    update$: Observable<Action> = this.actions$.pipe(
        ofType<actions.UpdateRequest>(
            actions.ActionTypes.UpdateRequest
        ),
        map(action => action.payload),
        switchMap(
            payload => fromPromise(
                this.firestoreSrv.update('proyectos', payload.id, payload.proyecto)
                    .then(() => payload.id)
            )
        ),
        flatMap(id => [
            new actions.UpdateSuccess(),
            new LogsStoreActions.CreateRequest({
                tipo: 'MODIFICAR',
                coleccion: 'proyectos',
                documento: id
            })
        ]),
        catchError(error => observableOf(new actions.UpdateFailure({ error }))),
    );

    //eliminar documento de db
    @Effect()
    delete$: Observable<Action> = this.actions$.pipe(
        ofType<actions.DeleteRequest>(
            actions.ActionTypes.DeleteRequest
        ),
        map(action => action.payload.id),
        switchMap(
            id => fromPromise(
                this.firestoreSrv.delete('proyectos', id)
                    .then(() => id)
            )
        ),
        flatMap(id => [
            new NavigationStoreActions.GoTo({ path: ['proyectos'] }),
            new actions.DeleteSuccess(),
            new LogsStoreActions.CreateRequest({
                tipo: 'ELIMINAR',
                coleccion: 'proyectos',
                documento: id
            })
        ]),
        catchError(error => observableOf(new actions.DeleteFailure({ error }))),
    );
}
