import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Proyecto } from '../../models';

export const proyectosAdapter: EntityAdapter<
  Proyecto
> = createEntityAdapter<Proyecto>({
  selectId: model => model.id,
  sortComparer: (a: Proyecto, b: Proyecto): number =>
    b.timestamp.toString().localeCompare(a.timestamp.toString())
});

export interface State extends EntityState<any> {
  isLoading?: boolean;
  hasLoaded?: boolean;
  error?: any;
}

export const initialState: State = proyectosAdapter.getInitialState({
  hasLoaded: false,
})