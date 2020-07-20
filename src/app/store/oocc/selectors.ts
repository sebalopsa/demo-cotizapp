import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
} from '@ngrx/store';

import { OrdenCompra } from '../../models';

import { ooccAdapter, State } from './state';

export const getError = (state: State): any => state.error;
export const getIsLoading = (state: State): boolean => state.isLoading;
export const getHasLoaded = (state: State): boolean => state.hasLoaded;
export const getCount = (state: State): number => state.count;
export const getLastFolio = (state: State): number => state.lastFolio;
export const getNuevaOrdenCompra = (state: State): any => state.nuevaOrdenCompra;
export const getIsEditing = (state: State): boolean => state.isEditing;

export const selectState: MemoizedSelector<object, State> = createFeatureSelector<State>('oocc');

export const selectAllItems: (state: object) => OrdenCompra[] = ooccAdapter.getSelectors(selectState).selectAll;

export const selectById = (id: string) =>
    createSelector(this.selectAllItems, (all: OrdenCompra[]) => {
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

export const selectNuevaOrdenCompra: MemoizedSelector<object, any> = createSelector(selectState, getNuevaOrdenCompra);

export const selectIsEditing: MemoizedSelector<object, boolean> = createSelector(selectState, getIsEditing);