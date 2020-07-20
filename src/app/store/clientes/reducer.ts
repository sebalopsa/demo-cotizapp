import { Actions, ActionTypes } from './actions';
import { clientesAdapter, initialState, State } from './state';

export function clientesReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LoadRequested: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.LoadSucceeded: {
      return clientesAdapter.addAll(action.payload.items, {
        ...state,
        isLoading: false,
        hasLoaded: true,
        error: null,
        count: action.payload.items.length
      });
    }
    case ActionTypes.LoadFailed: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    case ActionTypes.EditingStarted: {
      return {
        ...state,
        temp: action.payload,
        editing: true
      };
    }
    case ActionTypes.EditingFinished: {
      return {
        ...state,
        temp: null,
        editing: false
      };
    }
    case ActionTypes.FormChanged: {
      return {
        ...state,
        temp: { ...state.temp, ...action.payload }
      };
    }
    case ActionTypes.CreateClienteRequested: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case ActionTypes.CreateClienteSucceeded: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case ActionTypes.CreateClienteFailed: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    case ActionTypes.UpdateClienteRequested: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case ActionTypes.UpdateClienteSucceeded: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case ActionTypes.UpdateClienteFailed: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    case ActionTypes.DeleteClienteRequested: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case ActionTypes.DeleteClienteSucceeded: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case ActionTypes.DeleteClienteFailed: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    default: {
      return state;
    }
  }
}
