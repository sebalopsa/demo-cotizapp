import { Actions, ActionTypes } from './actions';
import { trabajadoresAdapter, initialState, State } from './state';

export function trabajadoresReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    // load documents
    case ActionTypes.LoadRequest: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ActionTypes.LoadSuccess: {
      return trabajadoresAdapter.addAll(action.payload.items, {
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
    //create document
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
    //update document
    case ActionTypes.UpdateRequest: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.UpdateSuccess: {
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    }
    case ActionTypes.UpdateFailure: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    //delete document
    case ActionTypes.DeleteRequest: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.DeleteSuccess: {
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    }
    case ActionTypes.DeleteFailure: {
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