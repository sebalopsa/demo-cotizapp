import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf, from as fromPromise } from 'rxjs';
import { catchError, map, flatMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { FirestoreService } from 'src/app/services/firestore.service';
import * as clientesActions from './actions';
import { ClientesFacadeService } from './facade';

@Injectable()
export class ClientesStoreEffects {
    constructor(
        private dataService: FirestoreService,
        private actions$: Actions,
        private cliFacadeSrv: ClientesFacadeService
    ) { }

    //CARGAR ITEMS SI NO ESTAN CARGADOS
    @Effect()
    loadItems$: Observable<Action> = this.actions$.pipe(
        ofType<clientesActions.LoadItems>(
            clientesActions.ActionTypes.LoadItems
        ),
        withLatestFrom(this.cliFacadeSrv.hasLoaded$),
        map(([_, hasLoaded]) => hasLoaded ?
            new clientesActions.ItemsLoaded() :
            new clientesActions.LoadRequested()
        )
    )

    //CARGAR ITEMS DESDE FIRESTORE
    @Effect()
    loadFromFirestore$: Observable<Action> = this.actions$.pipe(
        ofType<clientesActions.LoadRequested>(
            clientesActions.ActionTypes.LoadRequested
        ),
        switchMap(_ => this.dataService.getItems('clientes')),
        map(items => new clientesActions.LoadSucceeded({ items })),
        catchError(error => observableOf(new clientesActions.LoadFailed({ error })))
    )

    //COMENZAR A EDITAR NUEVO CLIENTE
    @Effect()
    addNew$: Observable<Action> = this.actions$.pipe(
        ofType<clientesActions.AddNew>(
            clientesActions.ActionTypes.AddNew
        ),
        map(_ =>
            new clientesActions.EditingStarted(this.fromZero()),
        )
    )

    //CCOMENZAR A EDITAR CLIENTE
    @Effect()
    editOne$: Observable<Action> = this.actions$.pipe(
        ofType<clientesActions.EditOne>(
            clientesActions.ActionTypes.EditOne
        ),
        map(action =>
            new clientesActions.EditingStarted(action.payload),
        )
    )

    //CANCELAR EDICION
    @Effect()
    discardChanges$: Observable<Action> = this.actions$.pipe(
        ofType<clientesActions.DiscardChanges>(
            clientesActions.ActionTypes.DiscardChanges
        ),
        map(_ =>
            new clientesActions.EditingFinished()
        )
    )

    //SPLITTER PARA CREAR O MODIFICAR SEGÚN EL CASO
    @Effect()
    saveChanges$: Observable<Action> = this.actions$.pipe(
        ofType<clientesActions.SaveChanges>(
            clientesActions.ActionTypes.SaveChanges
        ),
        withLatestFrom(this.cliFacadeSrv.temp$),
        map(([_, temp]) =>
            temp.id ?
                new clientesActions.UpdateClienteRequested(temp) :
                new clientesActions.CreateClienteRequested(temp)
        ),
    )

    //CREATE CLIENTE FIRESTORE
    @Effect()
    create$: Observable<Action> = this.actions$.pipe(
        ofType<clientesActions.CreateClienteRequested>(
            clientesActions.ActionTypes.CreateClienteRequested
        ),
        switchMap(
            action => fromPromise(this.dataService.create('clientes', action.payload))
        ),
        map(_ => new clientesActions.CreateClienteSucceeded(),
        ),
        catchError(error => observableOf(new clientesActions.CreateClienteFailed({ error }))),
        flatMap(action => [
            action,
            new clientesActions.EditingFinished()
        ]),
    );

    //UPDATE CLIENTE FIRESTORE
    @Effect()
    update$: Observable<Action> = this.actions$.pipe(
        ofType<clientesActions.UpdateClienteRequested>(
            clientesActions.ActionTypes.UpdateClienteRequested
        ),
        switchMap(action => fromPromise(this.dataService.set('clientes',  action.payload.id, action.payload))),
        map(_ => new clientesActions.UpdateClienteSucceeded()),
        catchError(error => observableOf(new clientesActions.UpdateClienteFailed({ error }))),
        flatMap(action => [
            action,
            new clientesActions.EditingFinished()
        ]),
    );

    //DELETE CLIENTE
    @Effect()
    delete$: Observable<Action> = this.actions$.pipe(
        ofType<clientesActions.DeleteOne>(
            clientesActions.ActionTypes.DeleteOne
        ),
        map(action => new clientesActions.DeleteClienteRequested(action.payload))
    );

    //DELETE CLIENTE FIRESTORE
    @Effect()
    deleteOnFirestore$: Observable<Action> = this.actions$.pipe(
        ofType<clientesActions.DeleteClienteRequested>(
            clientesActions.ActionTypes.DeleteClienteRequested
        ),
        switchMap(action => fromPromise(this.dataService.delete('clientes', action.payload))),
        map(() => new clientesActions.DeleteClienteSucceeded()),
        catchError(error => observableOf(new clientesActions.DeleteClienteFailed({ error }))),
    );




    fromZero() {
        return {
            nombre: null,
            rut: null,
            direccion: null,
            telefono: null,
            email: null
        }
    }



}