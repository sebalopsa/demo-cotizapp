import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of as observableOf, from as observableFrom } from 'rxjs';
import { catchError, map, tap, switchMap, flatMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as authActions from './actions';
import { NavigationStoreActions } from '../navigation';

@Injectable()
export class AuthStoreEffects {

    constructor(private authSrv: AuthService, private actions$: Actions, private store$: Store<any>) { }

    //OBSERVAR ESTADO DE AUTENTIFICACION
    @Effect()
    getAuthState: Observable<Action> = this.actions$.pipe(
        ofType<authActions.GetAuthState>(
            authActions.ActionTypes.GetAuthState
        ),
        tap(_ => this.store$.dispatch(new authActions.GettingAuthState())),
        switchMap(_ => this.authSrv.authState().pipe(
            map(user => user ?
                new authActions.Authenticated({
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email
                }) :
                new authActions.NotAuthenticated()
            ),
            catchError(error =>
                observableOf(new authActions.GetAuthStateFailed({ error: error.message }))
            )
        )),

    )

    //ENTRAR SI ESTA AUTENTIFICADO
    @Effect()
    getIn: Observable<Action> = this.actions$.pipe(
        ofType<authActions.Authenticated>(
            authActions.ActionTypes.Authenticated
        ),
        map(_ => new NavigationStoreActions.GoTo({ path: [''] }))
    );

    //SALIR SI NO ESTÁ AUTENTIFICADO
    @Effect()
    goOut: Observable<Action> = this.actions$.pipe(
        ofType<authActions.NotAuthenticated>(
            authActions.ActionTypes.NotAuthenticated
        ),
        map(_ => new NavigationStoreActions.GoTo({ path: ['/login'] }))
    );

    //LOGIN
    @Effect()
    login: Observable<Action> = this.actions$.pipe(
        ofType<authActions.Login>(
            authActions.ActionTypes.Login
        ),
        map(action => action.payload),
        tap(credentials => this.store$.dispatch(new authActions.LoginRequested(credentials))),
        switchMap(credentials => observableFrom(this.authSrv.login(credentials)).pipe(
            map(_ => new authActions.LoginSucceeded()),
            catchError(error => observableOf(new authActions.LoginFailed({ error })))
        )),

    )

    //LOGOUT
    @Effect()
    logout: Observable<Action> = this.actions$.pipe(
        ofType<authActions.Logout>(
            authActions.ActionTypes.Logout
        ),
        tap(_ => this.store$.dispatch(new authActions.LogoutRequested())),
        switchMap(_ => observableFrom(this.authSrv.logout()).pipe(
            map(_ => new authActions.LogoutSucceeded()),
            catchError(error => observableOf(new authActions.LogoutFailed({ error })))
        )),

    )
}