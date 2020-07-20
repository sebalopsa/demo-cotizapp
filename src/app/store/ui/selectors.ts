import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
  } from '@ngrx/store';
    
  import { State } from './state';
  
  const getSidebar = (state: State): boolean => state.sidebar;
  const getCollapsed = (state: State): boolean => state.collapsed;
  const getModal = (state: State): string => state.modal;
  const getpdfSource = (state: State): any => state.pdfSource;

  export const selectState: MemoizedSelector<
    object,
    State
  > = createFeatureSelector<State>('ui');
  
  export const selectSidebar: MemoizedSelector<object, any> = createSelector(
    selectState,
    getSidebar
  );
  
  export const selectCollapsed: MemoizedSelector<object, any> = createSelector(
    selectState,
    getCollapsed
  );
  
  export const selectModal: MemoizedSelector<object, any> = createSelector(
    selectState,
    getModal
  );

  export const selectPdfSource: MemoizedSelector<object, any> = createSelector(selectState, getpdfSource);

  