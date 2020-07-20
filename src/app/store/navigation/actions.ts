import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export enum ActionTypes {
    GoTo            = '[Navigation] Go to',
    Back            = '[Navigation] Back',
    Forward         = '[Navigation] Forward',
    RouteChange     = '[Navigation] Route Change',
}

// Get User AuthState
export class GoTo implements Action {
    readonly type = ActionTypes.GoTo;
    constructor(
        public payload: {
            path: any[];
            queryParams?: object;
            extras?: NavigationExtras;
        }
    ) { }
}

export class Back implements Action {
    readonly type = ActionTypes.Back;
    constructor(public payload?: any) { }
}

export class Forward implements Action {
    readonly type = ActionTypes.Forward;
    constructor(public payload?: any) { }
}

export class RouteChange implements Action {
    readonly type = ActionTypes.RouteChange;
    constructor(public payload: { params: any, path: string }) { }
}

export type NavigationActions
    = GoTo
    | Back
    | Forward
    | RouteChange