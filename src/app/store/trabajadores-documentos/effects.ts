import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of as observableOf, from as observableFrom } from 'rxjs';
import { catchError, map, flatMap, switchMap, withLatestFrom, filter, tap, takeWhile, first } from 'rxjs/operators';
import * as TrabajadoresDocumentosStoreActions from './actions';
// import { TrabajadoresDocumentosFacadeService } from './facade';
// import { NavigationStoreActions } from '..';
import { FirestoreService } from 'src/app/services/firestore.service';
import { StorageService } from 'src/app/services/storage.service';
import { from } from 'rxjs';
@Injectable()
export class TrabajadoresDocumentosStoreEffects {
    constructor(
        private firestoreSrv: FirestoreService,
        private actions$: Actions,
        private store$: Store<any>,
        private storageSrv: StorageService
    ) { }


    //cargar documentos desde db
    @Effect()
    loadRequest$: Observable<Action> = this.actions$.pipe(
        ofType<TrabajadoresDocumentosStoreActions.LoadRequest>(
            TrabajadoresDocumentosStoreActions.ActionTypes.LoadRequest
        ),
        switchMap(
            () => this.firestoreSrv.getItems('trabajadoresDocumentos').pipe(
                map(items => new TrabajadoresDocumentosStoreActions.LoadSuccess({ items })),
                catchError(error => observableOf(new TrabajadoresDocumentosStoreActions.LoadFailure({ error })))
            )
        )
    )

    // crear documento en db
    @Effect()
    create$: Observable<Action> = this.actions$.pipe(
        ofType<TrabajadoresDocumentosStoreActions.CreateRequest>(
            TrabajadoresDocumentosStoreActions.ActionTypes.CreateRequest
        ),
        map(action => action.payload),
        switchMap(
            payload => from(
                this.firestoreSrv.create('trabajadoresDocumentos', Object.assign({}, payload.documento, { trabajador: payload.rut }))
                    .then(docRef => ({
                        id: docRef.id,
                        file: payload.file
                    })))
        ),
        flatMap(payload => [
            new TrabajadoresDocumentosStoreActions.CreateSuccess(),
            new TrabajadoresDocumentosStoreActions.UploadRequest(payload),
        ]),
        catchError(error => observableOf(new TrabajadoresDocumentosStoreActions.CreateFailure({ error }))),
    );

    // upload document file
    @Effect()
    uploadToStorage$: Observable<Action> = this.actions$.pipe(
        ofType<TrabajadoresDocumentosStoreActions.UploadRequest>(
            TrabajadoresDocumentosStoreActions.ActionTypes.UploadRequest
        ),
        map(action => action.payload),
        switchMap(payload =>
            observableFrom(this.storageSrv.put('trabajadoresDocumentos/' + payload.id, payload.file)
                .then((snapshot) => snapshot.ref.getDownloadURL())
                .then(url => ([url, payload.id]))
            ).pipe(
                flatMap(([url, id]) => [
                    new TrabajadoresDocumentosStoreActions.UploadSuccess(),
                    new TrabajadoresDocumentosStoreActions.UpdateRequest({ id, changes: { url: url } }),
                ]),
                catchError(error => observableOf(new TrabajadoresDocumentosStoreActions.UploadFailure({ error: error })))
            ))
    )

    //actualizar documento en db
    @Effect()
    update$: Observable<Action> = this.actions$.pipe(
        ofType<TrabajadoresDocumentosStoreActions.UpdateRequest>(
            TrabajadoresDocumentosStoreActions.ActionTypes.UpdateRequest
        ),
        map(action => action.payload),
        switchMap(
            payload => from(this.firestoreSrv.set('trabajadoresDocumentos', payload.id, payload.changes))
        ),
        flatMap(() => [
            new TrabajadoresDocumentosStoreActions.UpdateSuccess(),
        ]),
        catchError(error => observableOf(new TrabajadoresDocumentosStoreActions.UpdateFailure({ error }))),
    );

    //eliminar documento en db
    @Effect()
    delete$: Observable<Action> = this.actions$.pipe(
        ofType<TrabajadoresDocumentosStoreActions.DeleteRequest>(
            TrabajadoresDocumentosStoreActions.ActionTypes.DeleteRequest
        ),
        map(action => action.payload.id),
        switchMap(
            id => from(this.firestoreSrv.delete('trabajadoresDocumentos', id))
        ),
        flatMap(() => [
            new TrabajadoresDocumentosStoreActions.DeleteSuccess(),

        ]),
        catchError(error => observableOf(new TrabajadoresDocumentosStoreActions.DeleteFailure({ error }))),
    );
}