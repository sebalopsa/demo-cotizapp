import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Router, ActivationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { tap, map, filter } from 'rxjs/operators';
import * as navigationActions from './actions';

@Injectable()
export class NavigationStoreEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private location: Location,
        private store: Store<any>
    ) {
        // this.listenToRouter();
    }

    @Effect({ dispatch: false })
    navigate$ = this.actions$.pipe(
        ofType(navigationActions.ActionTypes.GoTo),
        map((action: navigationActions.GoTo) => action.payload),
        tap(({ path, queryParams, extras }) => this.router.navigate(path, { queryParams, ...extras }))
    );

    @Effect({ dispatch: false })
    navigateBack$ = this.actions$.pipe(ofType(navigationActions.ActionTypes.Back), tap(() => this.location.back()));

    @Effect({ dispatch: false })
    navigateForward$ = this.actions$.pipe(
        ofType(navigationActions.ActionTypes.Forward),
        tap(() => this.location.forward())
    );

    // private listenToRouter() {
    //     this.router.events.pipe(
    //         filter(event => event instanceof ActivationEnd)
    //     ).subscribe((event: ActivationEnd) =>
    //         this.store.dispatch(new navigationActions.RouteChange({
    //             params: { ...event.snapshot.params },
    //             path: event.snapshot.routeConfig.path
    //         }))
    //     );
    // }
}