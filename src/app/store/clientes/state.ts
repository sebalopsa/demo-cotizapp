import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Cliente } from '../../models';

export const clientesAdapter: EntityAdapter<
  Cliente
> = createEntityAdapter<Cliente>({
  selectId: model => model.id,
  sortComparer: (a: Cliente, b: Cliente): number =>
    a.nombre.toString().localeCompare(b.nombre.toString())
});

export interface State extends EntityState<Cliente> {
  isLoading?: boolean;
  hasLoaded?: boolean;
  error?: any;
  count?: number;
  temp?: Cliente;
  editing?: boolean;
}

export const initialState: State = clientesAdapter.getInitialState(
  {
    // isLoading: false,
    // hasLoaded: false
  }
);