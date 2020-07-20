import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const trabajadoresDocumentosAdapter: EntityAdapter<any> =
  createEntityAdapter<any>({
    selectId: model => model.id,
    sortComparer: (a: any, b: any): number =>
      a.timestamp.toString().localeCompare(b.timestamp.toString())
  });

export interface State extends EntityState<any> {
  isLoading?: boolean;
  hasLoaded?: boolean;
  error?: any;
}

export const initialState: State = trabajadoresDocumentosAdapter.getInitialState(
  {
    hasLoaded: false,
  }
);