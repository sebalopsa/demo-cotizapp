import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Cliente } from '../../models';
import { clientesAdapter, State } from './state';

export const selectClientesState: MemoizedSelector<object, State> = createFeatureSelector<State>('clientes');

export const getError = (state: State): any => state.error;
export const getIsLoading = (state: State): boolean => state.isLoading;
export const getHasLoaded = (state: State): boolean => state.hasLoaded;
export const getCounter = (state: State): number => state.count;
export const getTemp = (state: State): Cliente => state.temp;
export const getEditing = (state: State): boolean => state.editing;

export const selectAllClientes: (state: object) => Cliente[] = clientesAdapter.getSelectors(selectClientesState).selectAll;
export const selectClienteById = (id: string) => createSelector(this.selectAllCotizacionesItems, (allItems: Cliente[]) => {
    if (allItems)
        return allItems.find(p => p.id === id);
    else return null;
});

export const selectError: MemoizedSelector<object, any> = createSelector(selectClientesState, getError);
export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(selectClientesState, getIsLoading);
export const selectHasLoaded: MemoizedSelector<object, boolean> = createSelector(selectClientesState, getHasLoaded);
export const selectCounter: MemoizedSelector<object, number> = createSelector(selectClientesState, getCounter);
export const selectTemp: MemoizedSelector<object,Cliente> = createSelector(selectClientesState, getTemp);
export const selectEditing: MemoizedSelector<object,boolean> = createSelector(selectClientesState, getEditing);
