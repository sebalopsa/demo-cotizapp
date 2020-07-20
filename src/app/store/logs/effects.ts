import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, from } from 'rxjs';
import { catchError, map, flatMap, switchMap, tap, withLatestFrom, concatMap } from 'rxjs/operators';
import { FirestoreService } from 'src/app/services/firestore.service';
import * as logsActions from './actions';
import { LogsFacadeService } from './facade';
import { AuthFacadeService } from '../auth/facade';

@Injectable()
export class LogsStoreEffects {
    constructor(
        private firestoreSrv: FirestoreService,
        private actions$: Actions,
        private facadeSrv: LogsFacadeService,
        private authFacade: AuthFacadeService
    ) { }

    //cargar documentos desde db
    @Effect()
    loadRequest$: Observable<Action> = this.actions$.pipe(
        ofType<logsActions.LoadRequest>(
            logsActions.ActionTypes.LoadRequest
        ),
        map(action=> action.payload),
        switchMap(
            payload => this.firestoreSrv.getItems('logs').pipe(
                concatMap(items => of(items).pipe(
                    withLatestFrom(this.facadeSrv.hasLoaded$),
                )),
                // tap(([items, hasLoaded]) => {
                //     if (hasLoaded) {
                //         window.alert('Congrats on adding your first book!');
                //     }
                // }),
                map(([items, hasLoaded]) => new logsActions.LoadSuccess({ items })),
                catchError(error => of(new logsActions.LoadFailure({ error })))
            )
        ),
    )

    // crear documento en db
    @Effect()
    create$: Observable<Action> = this.actions$.pipe(
        ofType<logsActions.CreateRequest>(
            logsActions.ActionTypes.CreateRequest
        ),
        map(action => action.payload),
        withLatestFrom(this.authFacade.user$),
        map(([payload, user]) => ({
            ...payload,
            usuario: user.email,
            timestamp: Date.now()
        })),
        switchMap(
            log  => from(this.firestoreSrv.create('logs', log))
        ),
        flatMap(() => [
            new logsActions.CreateSuccess(),
        ]),
        catchError(error => of(new logsActions.CreateFailure({ error }))),
    );
}
