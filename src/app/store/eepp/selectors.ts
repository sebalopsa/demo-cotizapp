import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
} from '@ngrx/store';

import { EstadoPago } from '../../models';

import { eeppAdapter, State } from './state';

export const getError = (state: State): any => state.error;
export const getIsLoading = (state: State): boolean => state.isLoading;
export const getHasLoaded = (state: State): boolean => state.hasLoaded;
export const getCount = (state: State): number => state.count;
export const getLastFolio = (state: State): number => state.lastFolio;
export const getNuevoEstadoPago = (state: State): any => state.nuevoEstadoPago;
export const getIsEditing = (state: State): boolean => state.isEditing;

export const selectState: MemoizedSelector<object, State> = createFeatureSelector<State>('eepp');

export const selectAllItems: (state: object) => EstadoPago[] = eeppAdapter.getSelectors(selectState).selectAll;

export const selectById = (id: string) =>
    createSelector(this.selectAllItems, (all: EstadoPago[]) => {
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

export const selectNuevoEstadoPago: MemoizedSelector<object, any> = createSelector(selectState, getNuevoEstadoPago);

export const selectIsEditing: MemoizedSelector<object, boolean> = createSelector(selectState, getIsEditing);