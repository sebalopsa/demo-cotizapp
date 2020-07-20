import * as authActions from './actions';
import { User } from '../../models';
import { initialState, State } from './state';

/// Reducer function
export function authReducer(state: State = initialState, action: authActions.AuthActions) {
    switch (action.type) {
        case authActions.ActionTypes.GettingAuthState:
            return {
                ...state,
                loading: true
            };
        case authActions.ActionTypes.Authenticated:
            return {
                ...state,
                user: action.payload,
                authenticated: true,
                loading: false
            };
        case authActions.ActionTypes.NotAuthenticated:
            return {
                ...state,
                user: null,
                authenticated: false,
                loading: false
            };
        case authActions.ActionTypes.GetAuthStateFailed:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            };
        case authActions.ActionTypes.LoginRequested:
            return {
                ...state,
                loading: true
            };
        case authActions.ActionTypes.LoginSucceeded:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case authActions.ActionTypes.LoginFailed:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        case authActions.ActionTypes.LogoutRequested:
            return {
                ...state,
                loading: true
            };
        case authActions.ActionTypes.LogoutSucceeded:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case authActions.ActionTypes.LogoutFailed:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        default:
            return state;
    }
}