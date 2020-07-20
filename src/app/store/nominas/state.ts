import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const nominasAdapter: EntityAdapter<any> =
  createEntityAdapter<any>({
    selectId: model => model.id,
    sortComparer: (a: any, b: any): number =>
      b.id.toString().localeCompare(a.id.toString())
  });

export interface State extends EntityState<any> {
  isLoading?: boolean;
  hasLoaded?: boolean;
  error?: any;
}

export const initialState: State = nominasAdapter.getInitialState(
  {
    hasLoaded: false,
  }
);