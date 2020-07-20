import * as uiActions from './actions';
import { initialState, State } from './state';


/// Reducer function
export function uiReducer(state: State = initialState, action: uiActions.UiActions) {
    switch (action.type) {
        case uiActions.ActionTypes.SidebarToggled:
            {
                return { ...state, sidebar: !state.sidebar };
            }
        case uiActions.ActionTypes.SidebarHidden:
            {
                return { ...state, sidebar: false };
            }
        case uiActions.ActionTypes.CollapsedToggled:
            {
                return { ...state, collapsed: !state.collapsed };
            }
        case uiActions.ActionTypes.SidebarCollapsed:
            {
                return { ...state, collapsed: true };
            }
        case uiActions.ActionTypes.ModalOpened:
            {
                return { ...state, modal: action.payload };
            }
        case uiActions.ActionTypes.ModalClosed:
            {
                return { ...state, modal: null };
            }
        case uiActions.ActionTypes.PdfSourceSetted:
            {
                return { ...state, pdfSource: action.payload };
            }
        default:
            return state;
    }
}