import { Actions, ActionTypes } from './actions';
import { ooccAdapter, initialState, State } from './state';

export function ooccReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LoadingItems: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ActionTypes.LoadSucceeded: {
      return ooccAdapter.addAll(action.payload.items, {
        ...state,
        isLoading: false,
        hasLoaded: true,
        error: null,
        count: action.payload.items.length,
        lastFolio: Math.max.apply(Math, [1399, ...action.payload.items.map(function (item) { return Number(item.folio) })])

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
        nuevaOrdenCompra: {
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
        nuevaOrdenCompra: {
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
        nuevaOrdenCompra: null
      };
    }
    case ActionTypes.DraftModified: {
      return {
        ...state,
        nuevaOrdenCompra: {
          ...state.nuevaOrdenCompra,
          draft: { ...state.nuevaOrdenCompra.draft, ...action.payload }
        }
      };
    }

    case ActionTypes.MakingPdf: {
      return {
        ...state,
        nuevaOrdenCompra: {
          ...state.nuevaOrdenCompra,
          isLoading: true
        }
      };
    }
    case ActionTypes.PdfSuccessfullyMade: {
      return {
        ...state,
        nuevaOrdenCompra: {
          ...state.nuevaOrdenCompra,
          isLoading: false,
        }
      };
    }
    case ActionTypes.MakePdfFailed: {
      return {
        ...state,
        nuevaOrdenCompra: {
          ...state.nuevaOrdenCompra,
          isLoading: false,
          error: action.payload.error
        }
      };
    }
    case ActionTypes.CreatingFirestoreDocument: {
      return {
        ...state,
        nuevaOrdenCompra: {
          ...state.nuevaOrdenCompra,
          isLoading: true
        }
      };
    }
    case ActionTypes.FirestoreDocumentSuccessfullyCreated: {
      return {
        ...state,
        nuevaOrdenCompra: {
          ...state.nuevaOrdenCompra,
          isLoading: false,
          newFolio: action.payload
        }
      };
    }
    case ActionTypes.CreateFirestoreDocumentFailed: {
      return {
        ...state,
        nuevaOrdenCompra: {
          ...state.nuevaOrdenCompra,
          isLoading: false,
          error: action.payload.error
        }
      };
    }
    case ActionTypes.UploadingToStorage: {
      return {
        ...state,
        nuevaOrdenCompra: {
          ...state.nuevaOrdenCompra,
          isLoading: true
        }
      };
    }
    case ActionTypes.PdfSuccessfullyUploaded: {
      return {
        ...state,
        nuevaOrdenCompra: {
          ...state.nuevaOrdenCompra,
          isLoading: false,
          url: action.payload
        }
      };
    }
    case ActionTypes.UploadToStorageFailed: {
      return {
        ...state,
        nuevaOrdenCompra: {
          ...state.nuevaOrdenCompra,
          isLoading: false,
          error: action.payload.error
        }
      };
    }
    case ActionTypes.UpdatingFirestoreDocument: {
      return {
        ...state,
        nuevaOrdenCompra: {
          ...state.nuevaOrdenCompra,
          isLoading: true,
        }
      };
    }
    case ActionTypes.FirestoreDocumentSuccessfullyUpdated: {
      return {
        ...state,
        nuevaOrdenCompra: {
          ...state.nuevaOrdenCompra,
          isLoading: false,
        }
      };
    }
    case ActionTypes.UpdateFirestoreDocumentFailed: {
      return {
        ...state,
        nuevaOrdenCompra: {
          ...state.nuevaOrdenCompra,
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

