import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const trabajadoresAdapter: EntityAdapter<any> =
  createEntityAdapter<any>({
    selectId: model => model.id,
    // sortComparer: (a: any, b: any): number =>
    //   a.apellidos.toString().localeCompare(b.apellidos.toString())
  });

export interface State extends EntityState<any> {
  isLoading?: boolean;
  hasLoaded?: boolean;
  error?: any;
}

export const initialState: State = trabajadoresAdapter.getInitialState(
  {
    hasLoaded: false,
  }
);