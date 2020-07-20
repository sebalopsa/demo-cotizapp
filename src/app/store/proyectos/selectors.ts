import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Proyecto } from '../../models';
import { proyectosAdapter, State } from './state';

const getRouterState = createFeatureSelector('router');

export const selectProyectosState = createFeatureSelector<State>('proyectos');

export const selectAllItems: (state: object) =>
    Proyecto[] = proyectosAdapter.getSelectors(selectProyectosState).selectAll;


export const selectProyectosById = (id: string) =>
    createSelector(
        selectAllItems,
        (entities: Proyecto[]) => {
            if (entities) {
                return entities.find(p => p.id === id);
            } else {
                return null;
            }
        });

export const selectProyectosByIdInRouter = () =>
    createSelector(
        selectAllItems,
        getRouterState,
        (entities: Proyecto[], router: any) => {
            if (router.state)
                return entities.find(p => p.id === router.state.params.id);
            else return null
        }
    );

export const selectProyectosError = createSelector(
    selectProyectosState,
    (state: State): any => state.error
);

export const selectProyectosIsLoading = createSelector(
    selectProyectosState,
    (state: State): boolean => state.isLoading
);

export const selectProyectosHasLoaded = createSelector(
    selectProyectosState,
    (state: State): boolean => state.hasLoaded
);
