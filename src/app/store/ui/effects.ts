import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import * as uiActions from './actions';


@Injectable()
export class UiStoreEffects {
    constructor(
        private actions$: Actions,
    ) { }

    //ABRIR VISTA DE DOCUMENTO PDF
    @Effect()
    openPdfView$: Observable<Action> = this.actions$.pipe(
        ofType<uiActions.OpenPdfView>(
            uiActions.ActionTypes.OpenPdfView
        ),
        flatMap(action => [
            new uiActions.PdfSourceSetted(action.payload),
            new uiActions.ModalOpened('pdf-view')
        ])
    )

    //CERRAR VISTA DE DOCUMENTO PDF
    @Effect()
    closePdfView$: Observable<Action> = this.actions$.pipe(
        ofType<uiActions.ClosePdfView>(
            uiActions.ActionTypes.ClosePdfView
        ),
        flatMap(action => [
            new uiActions.PdfSourceSetted(null),
            new uiActions.ModalClosed()
        ])
    )

}