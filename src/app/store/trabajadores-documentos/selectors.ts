import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
} from '@ngrx/store';

import { trabajadoresDocumentosAdapter, State } from './state';
import { TrabajadorDocumento } from 'src/app/models';

const getError = (state: State): any => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getHasLoaded = (state: State): boolean => state.hasLoaded;

const getRouterState = createFeatureSelector('router');

export const selectState: MemoizedSelector<object, State> =
    createFeatureSelector<State>('trabajadoresDocumentos');

export const selectAllItems: (state: object) => any[] =
    trabajadoresDocumentosAdapter.getSelectors(selectState).selectAll;

export const selectById = (id: string) =>
    createSelector(this.selectAllItems, (all: any[]) => {
        if (all) {
            return all.find(p => p.id === id);
        } else {
            return null;
        }
    });

export const selectDocumentoByTrabajadorIdInRouter =
    () => createSelector(
        selectAllItems,
        getRouterState,
        (entities: TrabajadorDocumento[], router: any) => {
            if (router.state)
                return entities.filter(
                    t => t.trabajador === router.state.params.rut
                );
            else return null
        }
    );

export const selectDocumentosPorVencer =
    () => createSelector(
        selectAllItems,
        getRouterState,
        (entities: TrabajadorDocumento[]) => {
            return entities.filter(
                doc => {
                    let diasFaltantes;
                    if (doc.fechaVencimiento) {
                        var unDia = 1000 * 60 * 60 * 24;    // Convert both dates to milliseconds
                        var diferencia = doc.fechaVencimiento - Date.now();        // Convert back to days and return   
                        diasFaltantes = Math.round(diferencia / unDia);
                    }
                    return diasFaltantes? diasFaltantes<=30:false
                }
            );

        }
    );

export const selectError: MemoizedSelector<object, any> =
    createSelector(selectState, getError);

export const selectIsLoading: MemoizedSelector<object, boolean> =
    createSelector(selectState, getIsLoading);

export const selectHasLoaded: MemoizedSelector<object, boolean> =
    createSelector(selectState, getHasLoaded);