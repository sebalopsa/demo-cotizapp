import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Log } from '../../models';

export const logsAdapter: EntityAdapter<
Log
> = createEntityAdapter<Log>({
  selectId: model => model.id,
  sortComparer: (a: Log, b: Log): number =>
    b.timestamp.toString().localeCompare(a.timestamp.toString())
});

export interface State extends EntityState<any> {
  isLoading?: boolean;
  hasLoaded?: boolean;
  error?: any;
}

export const initialState: State = logsAdapter.getInitialState({
  hasLoaded: false,
})