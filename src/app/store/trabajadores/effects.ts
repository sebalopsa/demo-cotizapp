import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of as observableOf, from as observableFrom } from 'rxjs';
import { catchError, map, flatMap, switchMap, withLatestFrom, filter, tap, takeWhile, first } from 'rxjs/operators';
import * as TrabajadoresStoreActions from './actions';
import { TrabajadoresFacadeService } from './facade';
import { NavigationStoreActions } from '../navigation';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Trabajador } from 'src/app/models';
import { StorageService } from 'src/app/services/storage.service';
import { from } from 'rxjs';
import { LogsStoreActions } from '../logs';

@Injectable()
export class TrabajadoresStoreEffects {
    constructor(
        private firestoreSrv: FirestoreService,
        private actions$: Actions,
        private cotFacadeSrv: TrabajadoresFacadeService,
        private store$: Store<any>,
    ) { }


    //cargar documentos desde db
    @Effect()
    loadRequest$: Observable<Action> = this.actions$.pipe(
        ofType<TrabajadoresStoreActions.LoadRequest>(
            TrabajadoresStoreActions.ActionTypes.LoadRequest
        ),
        switchMap(
            () => this.firestoreSrv.getItems('trabajadores', true).pipe(
                map(items => new TrabajadoresStoreActions.LoadSuccess({ items })),
                catchError(error => observableOf(new TrabajadoresStoreActions.LoadFailure({ error })))
            )
        )
    )

    //crear documento en db
    @Effect()
    create$: Observable<Action> = this.actions$.pipe(
        ofType<TrabajadoresStoreActions.CreateRequest>(
            TrabajadoresStoreActions.ActionTypes.CreateRequest
        ),
        map(action => action.payload.trabajador),
        map(trabajador => Object.assign({ virgin: true }, trabajador)),
        switchMap(
            trabajador => from(this.firestoreSrv.createWithId('trabajadores', trabajador, trabajador.rut).then(() => trabajador.rut))
        ),
        flatMap(rut => [
            new NavigationStoreActions.GoTo({ path: ['trabajadores', 'lista', rut] }),
            new TrabajadoresStoreActions.CreateSuccess(),
            new LogsStoreActions.CreateRequest({
                tipo: 'CREAR',
                coleccion: 'trabajadores',
                documento: rut
            })
        ]),
        catchError(error => observableOf(new TrabajadoresStoreActions.CreateFailure({ error }))),
    );

    //actualizar documento en db
    @Effect()
    update$: Observable<Action> = this.actions$.pipe(
        ofType<TrabajadoresStoreActions.UpdateRequest>(
            TrabajadoresStoreActions.ActionTypes.UpdateRequest
        ),
        map(action => action.payload),
        switchMap(
            payload => from(this.firestoreSrv.set('trabajadores', payload.rut, payload.changes)
                .then(() => payload.rut)
            )
        ),
        flatMap(rut => [
            new TrabajadoresStoreActions.UpdateSuccess(),
            new LogsStoreActions.CreateRequest({
                tipo: 'MODIFICAR',
                coleccion: 'trabajadores',
                documento: String(rut)
            })
        ]),
        catchError(error => observableOf(new TrabajadoresStoreActions.UpdateFailure({ error })))
    )
    //eliminar documento en db
    @Effect()
    delete$: Observable<Action> = this.actions$.pipe(
        ofType<TrabajadoresStoreActions.DeleteRequest>(
            TrabajadoresStoreActions.ActionTypes.DeleteRequest
        ),
        map(action => action.payload.rut),
        switchMap(
            rut => from(this.firestoreSrv.deleteFull('trabajadores', rut)
            .then(()=>rut))
        ),
        flatMap(rut => [
            new NavigationStoreActions.GoTo({ path: ['trabajadores', 'lista'] }),
            new TrabajadoresStoreActions.DeleteSuccess(),
            new LogsStoreActions.CreateRequest({
                tipo: 'ELIMINAR',
                coleccion: 'trabajadores',
                documento: String(rut)
            })
        ]),
        catchError(error => observableOf(new TrabajadoresStoreActions.DeleteFailure({ error }))),
    );



}