import * as roccflexActions from './actions';
import { initialState, State } from './state';

/// Reducer function
export function roccflexReducer(state: State = initialState, action: roccflexActions.RoccflexActions) {
    switch (action.type) {
        default:
            return state;
    }
}