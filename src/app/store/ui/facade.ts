import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as state from './state';
import * as selectors from './selectors';
import * as actions from './actions';


@Injectable({
    providedIn: 'root'
})
export class UiFacadeService {

    sidebar$: Observable<boolean>;
    collapsed$: Observable<boolean>;
    modal$: Observable<string>;
    pdfSource$: Observable<any>;

    constructor(private store$: Store<state.State>) {
        this.sidebar$ = this.store$.select(
            selectors.selectSidebar
        )
        this.collapsed$ = this.store$.select(
            selectors.selectCollapsed
        )
        this.modal$ = this.store$.select(
            selectors.selectModal
        )
        this.pdfSource$ = this.store$.select(
            selectors.selectPdfSource
        )
    }

    toggleSidebar() {
        this.store$.dispatch(new actions.SidebarToggled())
    }

    hideSidebar() {
        this.store$.dispatch(new actions.SidebarHidden())
    }

    toggleCollapsed() {
        this.store$.dispatch(new actions.CollapsedToggled())
    }

    collapseSidebar() {
        this.store$.dispatch(new actions.SidebarCollapsed())
    }

    openModal(modal: string) {
        this.store$.dispatch(new actions.ModalOpened(modal))
    }

    closeModal() {
        this.store$.dispatch(new actions.ModalClosed())
    }
    openPdfView(url) {
        this.store$.dispatch(new actions.OpenPdfView(url))
    }
    closePdfView() {
        this.store$.dispatch(new actions.ClosePdfView())
    }
}
