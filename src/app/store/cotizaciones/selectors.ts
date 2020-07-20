import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
} from '@ngrx/store';

import { Cotizacion } from '../../models';

import { cotizacionesAdapter, State } from './state';

export const getError = (state: State): any => state.error;
export const getIsLoading = (state: State): boolean => state.isLoading;
export const getHasLoaded = (state: State): boolean => state.hasLoaded;
export const getCount = (state: State): number => state.count;
export const getLastFolio = (state: State): number => state.lastFolio;
export const getNuevaCotizacion = (state: State): any => state.nuevaCotizacion;
export const getIsEditing = (state: State): boolean => state.isEditing;

export const selectState: MemoizedSelector<object, State> = createFeatureSelector<State>('cotizaciones');

export const selectAllItems: (state: object) => Cotizacion[] = cotizacionesAdapter.getSelectors(selectState).selectAll;

export const selectById = (id: string) =>
    createSelector(this.selectAllItems, (all: Cotizacion[]) => {
        if (all) {
            return all.find(p => p.id === id);
        } else {
            return null;
        }
    });

export const selectError: MemoizedSelector<object, any> = createSelector(selectState, getError);

export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(selectState, getIsLoading);

export const selectHasLoaded: MemoizedSelector<object, boolean> = createSelector(selectState, getHasLoaded);

export const selectCount: MemoizedSelector<object, number> = createSelector(selectState, getCount);

export const selectLastFolio: MemoizedSelector<object, number> = createSelector(selectState, getLastFolio);

export const selectNuevaCotizacion: MemoizedSelector<object, any> = createSelector(selectState, getNuevaCotizacion);

export const selectIsEditing: MemoizedSelector<object, boolean> = createSelector(selectState, getIsEditing);