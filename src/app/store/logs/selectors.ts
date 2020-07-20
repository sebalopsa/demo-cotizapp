import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Log } from '../../models';
import { logsAdapter, State } from './state';

export const selectLogs = createFeatureSelector<State>('logs');

export const selectAllItems: (state: object) => Log[] = logsAdapter.getSelectors(selectLogs).selectAll;

export const selectLast = () =>
    createSelector(selectAllItems, (entities: Log[]) => {
        if (entities) {
            return entities[0];
        } else {
            return null;
        }
    });
    
export const selectLogsError = createSelector(
    selectLogs,
    (state: State): any => state.error
);

export const selectLogsIsLoading = createSelector(
    selectLogs,
    (state: State): boolean => state.isLoading
);

export const selectLogsHasLoaded = createSelector(
    selectLogs,
    (state: State): boolean => state.hasLoaded
);