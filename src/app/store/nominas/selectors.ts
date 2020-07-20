import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
} from '@ngrx/store';
import { nominasAdapter, State } from './state';

const getError = (state: State): any => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getHasLoaded = (state: State): boolean => state.hasLoaded;

export const selectState: MemoizedSelector<object, State> = 
    createFeatureSelector<State>('nominas');

export const selectAllItems: (state: object) => any[] = 
    nominasAdapter.getSelectors(selectState).selectAll;

export const selectById = (id: string) =>
    createSelector(this.selectAllItems, (all: any[]) => {
        if (all) {
            return all.find(p => p.id === id);
        } else {
            return null;
        }
    });

export const selectError: MemoizedSelector<object, any> = 
    createSelector(selectState, getError);

export const selectIsLoading: MemoizedSelector<object, boolean> = 
    createSelector(selectState, getIsLoading);

export const selectHasLoaded: MemoizedSelector<object, boolean> = 
    createSelector(selectState, getHasLoaded);