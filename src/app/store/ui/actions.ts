import { Action } from '@ngrx/store';

export enum ActionTypes {
    SidebarToggled = '[Ui] Sidebar Toggled',
    SidebarHidden = '[Ui]Sidebar Hidden',
    CollapsedToggled = '[Ui] Collapsed Toggled',
    SidebarCollapsed = '[Ui] Sidebar Collapsed',
    ModalOpened = '[Ui] Modal Opened',
    ModalClosed = '[Ui] Modal Closed',
    OpenPdfView = '[Ui] Open Pdf View',
    ClosePdfView = '[Ui] Close Pdf View',
    PdfSourceSetted = '[Pdf View] Pdf Source Setted',
}

export class SidebarToggled implements Action {
    readonly type = ActionTypes.SidebarToggled;
    constructor(public payload?: any) { }
}

export class SidebarHidden implements Action {
    readonly type = ActionTypes.SidebarHidden;
}

export class CollapsedToggled implements Action {
    readonly type = ActionTypes.CollapsedToggled;
}

export class SidebarCollapsed implements Action {
    readonly type = ActionTypes.SidebarCollapsed;
}

export class ModalOpened implements Action {
    readonly type = ActionTypes.ModalOpened;
    constructor(public payload: string) { }
}

export class ModalClosed implements Action {
    readonly type = ActionTypes.ModalClosed;
}

export class OpenPdfView implements Action {
    readonly type = ActionTypes.OpenPdfView;
    constructor(public payload: any) { }
}

export class ClosePdfView implements Action {
    readonly type = ActionTypes.ClosePdfView;
}

export class PdfSourceSetted implements Action {
    readonly type = ActionTypes.PdfSourceSetted;
    constructor(public payload: any) { }
}

export type UiActions =
    SidebarToggled |
    SidebarHidden |
    CollapsedToggled |
    SidebarCollapsed |
    ModalOpened |
    ModalClosed |
    OpenPdfView |
    ClosePdfView |
    PdfSourceSetted 
