import { Actions, ActionTypes } from './actions';
import { eeppAdapter, initialState, State } from './state';

export function eeppReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LoadingItems: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ActionTypes.LoadSucceeded: {
      return eeppAdapter.addAll(action.payload.items, {
        ...state,
        isLoading: false,
        hasLoaded: true,
        error: null,
        count: action.payload.items.length,
        lastFolio: Math.max.apply(Math, [1484, ...action.payload.items.map(function (item) { return Number(item.folio) })])

      });
    }
    case ActionTypes.LoadFailed: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    case ActionTypes.InitializingDraft: {
      return {
        ...state,
        nuevoEstadoPago: {
          draft: null,
          isEditing: false,
          isValid: false,
          isLoading: true
        }
      };
    }
    case ActionTypes.DraftInitialized: {
      return {
        ...state,
        nuevoEstadoPago: {
          draft: action.payload,
          isEditing: true,
          isValid: false,
          isLoading: false
        }
      };
    }
    case ActionTypes.DraftCleaned: {
      return {
        ...state,
        nuevoEstadoPago: null
      };
    }
    case ActionTypes.DraftModified: {
      return {
        ...state,
        nuevoEstadoPago: {
          ...state.nuevoEstadoPago,
          draft: { ...state.nuevoEstadoPago.draft, ...action.payload }
        }
      };
    }

    case ActionTypes.MakingPdf: {
      return {
        ...state,
        nuevoEstadoPago: {
          ...state.nuevoEstadoPago,
          isLoading: true
        }
      };
    }
    case ActionTypes.PdfSuccessfullyMade: {
      return {
        ...state,
        nuevoEstadoPago: {
          ...state.nuevoEstadoPago,
          isLoading: false,
        }
      };
    }
    case ActionTypes.MakePdfFailed: {
      return {
        ...state,
        nuevoEstadoPago: {
          ...state.nuevoEstadoPago,
          isLoading: false,
          error: action.payload.error
        }
      };
    }
    case ActionTypes.CreatingFirestoreDocument: {
      return {
        ...state,
        nuevoEstadoPago: {
          ...state.nuevoEstadoPago,
          isLoading: true
        }
      };
    }
    case ActionTypes.FirestoreDocumentSuccessfullyCreated: {
      return {
        ...state,
        nuevoEstadoPago: {
          ...state.nuevoEstadoPago,
          isLoading: false,
          newFolio: action.payload
        }
      };
    }
    case ActionTypes.CreateFirestoreDocumentFailed: {
      return {
        ...state,
        nuevoEstadoPago: {
          ...state.nuevoEstadoPago,
          isLoading: false,
          error: action.payload.error
        }
      };
    }
    case ActionTypes.UploadingToStorage: {
      return {
        ...state,
        nuevoEstadoPago: {
          ...state.nuevoEstadoPago,
          isLoading: true
        }
      };
    }
    case ActionTypes.PdfSuccessfullyUploaded: {
      return {
        ...state,
        nuevoEstadoPago: {
          ...state.nuevoEstadoPago,
          isLoading: false,
          url: action.payload
        }
      };
    }
    case ActionTypes.UploadToStorageFailed: {
      return {
        ...state,
        nuevoEstadoPago: {
          ...state.nuevoEstadoPago,
          isLoading: false,
          error: action.payload.error
        }
      };
    }
    case ActionTypes.UpdatingFirestoreDocument: {
      return {
        ...state,
        nuevoEstadoPago: {
          ...state.nuevoEstadoPago,
          isLoading: true,
        }
      };
    }
    case ActionTypes.FirestoreDocumentSuccessfullyUpdated: {
      return {
        ...state,
        nuevoEstadoPago: {
          ...state.nuevoEstadoPago,
          isLoading: false,
        }
      };
    }
    case ActionTypes.UpdateFirestoreDocumentFailed: {
      return {
        ...state,
        nuevoEstadoPago: {
          ...state.nuevoEstadoPago,
          isLoading: false,
          error: action.payload.error
        }
      };
    }
    default: {
      return state;
    }
  }
}

