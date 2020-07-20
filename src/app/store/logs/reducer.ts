import { Actions, ActionTypes } from './actions';
import { logsAdapter, initialState, State } from './state';

export function logsReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    // load documents--------------------------------------------------
    case ActionTypes.LoadRequest: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ActionTypes.LoadSuccess: {
      return logsAdapter.addAll(action.payload.items, {
        ...state,
        hasLoaded: true,
        error: null,
        isLoading: false,
      });
    }
    case ActionTypes.LoadFailure: {
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    }
    //create document--------------------------------------------------
    case ActionTypes.CreateRequest: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.CreateSuccess: {
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    }
    case ActionTypes.CreateFailure: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    //default--------------------------------------------------
    default: {
      return state;
    }
  }
}