import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
} from '@ngrx/store';

import { trabajadoresAdapter, State } from './state';
import { Trabajador } from 'src/app/models';

const getError = (state: State): any => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getHasLoaded = (state: State): boolean => state.hasLoaded;

const getRouterState = createFeatureSelector('router');

export const selectState: MemoizedSelector<object, State> = 
    createFeatureSelector<State>('trabajadores');

export const selectAllItems: (state: object) => any[] = 
    trabajadoresAdapter.getSelectors(selectState).selectAll;

export const selectById = (id: string) =>
    createSelector(this.selectAllItems, (all: any[]) => {
        if (all) {
            return all.find(p => p.id === id);
        } else {
            return null;
        }
    });

export const selectTrabajadorByIdInRouter = 
    () => createSelector(
        selectAllItems, 
        getRouterState, 
        (entities: Trabajador[], router: any) => {
            if (router.state)
                return entities.find(
                    t => t.rut === router.state.params.rut
                );
            else return null
        }
    );

export const selectError: MemoizedSelector<object, any> = 
    createSelector(selectState, getError);

export const selectIsLoading: MemoizedSelector<object, boolean> = 
    createSelector(selectState, getIsLoading);

export const selectHasLoaded: MemoizedSelector<object, boolean> = 
    createSelector(selectState, getHasLoaded);