import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
  } from '@ngrx/store';
    
  import { State } from './state';
  
  const getEmpresas = (state: State): any => state.empresas;

  export const selectRoccflexState: MemoizedSelector<
    object,
    State
  > = createFeatureSelector<State>('roccflex');
  
  export const selectEmpresas: MemoizedSelector<object, any> = createSelector(
    selectRoccflexState,
    getEmpresas
  );