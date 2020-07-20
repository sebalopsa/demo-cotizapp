import { Actions, ActionTypes } from './actions';
import { cotizacionesAdapter, initialState, State } from './state';

export function cotizacionesReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LoadingItems: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ActionTypes.LoadSucceeded: {
      return cotizacionesAdapter.addAll(action.payload.items, {
        ...state,
        isLoading: false,
        hasLoaded: true,
        error: null,
        count: action.payload.items.length,
        lastFolio: Math.max.apply(Math, [1600, ...action.payload.items.map(function (item) { return Number(item.folio) })])

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
        nuevaCotizacion: {
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
        nuevaCotizacion: {
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
        nuevaCotizacion: null
      };
    }
    case ActionTypes.DraftModified: {
      return {
        ...state,
        nuevaCotizacion: {
          ...state.nuevaCotizacion,
          draft: { ...state.nuevaCotizacion.draft, ...action.payload }
        }
      };
    }

    case ActionTypes.MakingPdf: {
      return {
        ...state,
        nuevaCotizacion: {
          ...state.nuevaCotizacion,
          isLoading: true
        }
      };
    }
    case ActionTypes.PdfSuccessfullyMade: {
      return {
        ...state,
        nuevaCotizacion: {
          ...state.nuevaCotizacion,
          isLoading: false,
        }
      };
    }
    case ActionTypes.MakePdfFailed: {
      return {
        ...state,
        nuevaCotizacion: {
          ...state.nuevaCotizacion,
          isLoading: false,
          error: action.payload.error
        }
      };
    }
    case ActionTypes.CreatingFirestoreDocument: {
      return {
        ...state,
        nuevaCotizacion: {
          ...state.nuevaCotizacion,
          isLoading: true
        }
      };
    }
    case ActionTypes.FirestoreDocumentSuccessfullyCreated: {
      return {
        ...state,
        nuevaCotizacion: {
          ...state.nuevaCotizacion,
          isLoading: false,
          newFolio: action.payload
        }
      };
    }
    case ActionTypes.CreateFirestoreDocumentFailed: {
      return {
        ...state,
        nuevaCotizacion: {
          ...state.nuevaCotizacion,
          isLoading: false,
          error: action.payload.error
        }
      };
    }
    case ActionTypes.UploadingToStorage: {
      return {
        ...state,
        nuevaCotizacion: {
          ...state.nuevaCotizacion,
          isLoading: true
        }
      };
    }
    case ActionTypes.PdfSuccessfullyUploaded: {
      return {
        ...state,
        nuevaCotizacion: {
          ...state.nuevaCotizacion,
          isLoading: false,
          url: action.payload
        }
      };
    }
    case ActionTypes.UploadToStorageFailed: {
      return {
        ...state,
        nuevaCotizacion: {
          ...state.nuevaCotizacion,
          isLoading: false,
          error: action.payload.error
        }
      };
    }
    case ActionTypes.UpdatingFirestoreDocument: {
      return {
        ...state,
        nuevaCotizacion: {
          ...state.nuevaCotizacion,
          isLoading: true,
        }
      };
    }
    case ActionTypes.FirestoreDocumentSuccessfullyUpdated: {
      return {
        ...state,
        nuevaCotizacion: {
          ...state.nuevaCotizacion,
          isLoading: false,
        }
      };
    }
    case ActionTypes.UpdateFirestoreDocumentFailed: {
      return {
        ...state,
        nuevaCotizacion: {
          ...state.nuevaCotizacion,
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

