import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of as observableOf, from } from 'rxjs';
import { catchError, map, flatMap, switchMap } from 'rxjs/operators';
import * as NominasStoreActions from './actions';
import { NavigationStoreActions } from '../navigation';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LogsStoreActions } from '../logs';

@Injectable()
export class NominasStoreEffects {
    constructor(
        private firestoreSrv: FirestoreService,
        private actions$: Actions,
        private store$: Store<any>,
    ) { }


    //cargar documentos desde db
    @Effect()
    loadRequest$: Observable<Action> = this.actions$.pipe(
        ofType<NominasStoreActions.LoadRequest>(
            NominasStoreActions.ActionTypes.LoadRequest
        ),
        switchMap(
            () => this.firestoreSrv.getItems('nominas').pipe(
                map(items => new NominasStoreActions.LoadSuccess({ items })),
                catchError(error => observableOf(new NominasStoreActions.LoadFailure({ error })))
            )
        )
    )

    //crear documento en db
    @Effect()
    create$: Observable<Action> = this.actions$.pipe(
        ofType<NominasStoreActions.CreateRequest>(
            NominasStoreActions.ActionTypes.CreateRequest
        ),
        map(action => action.payload.nomina),
        switchMap(
            nomina => from(this.firestoreSrv.createWithId('nominas', nomina, nomina.id)
            .then(() => nomina.id))
        ),
        flatMap(id => [
            new NavigationStoreActions.GoTo({ path: ['trabajadores', 'nominas'] }),
            new NominasStoreActions.CreateSuccess(),
            new LogsStoreActions.CreateRequest({
                tipo: 'CREAR',
                coleccion: 'nominas',
                documento: id
            })
        ]),
        catchError(error => observableOf(new NominasStoreActions.CreateFailure({ error }))),
    );

    //eliminar documento en db
    @Effect()
    delete$: Observable<Action> = this.actions$.pipe(
        ofType<NominasStoreActions.DeleteRequest>(
            NominasStoreActions.ActionTypes.DeleteRequest
        ),
        map(action => action.payload.id),
        switchMap(
            id => from(this.firestoreSrv.delete('nominas', id)
            .then(()=>id))
        ),
        flatMap(id => [
            new NavigationStoreActions.GoTo({ path: ['trabajadores', 'nominas'] }),
            new NominasStoreActions.DeleteSuccess(),
            new LogsStoreActions.CreateRequest({
                tipo: 'ELIMINAR',
                coleccion: 'nominas',
                documento: id
            })
        ]),
        catchError(error => observableOf(new NominasStoreActions.DeleteFailure({ error }))),
    );



}