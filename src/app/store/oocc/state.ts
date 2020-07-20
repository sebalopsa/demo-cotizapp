import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { OrdenCompra } from '../../models';

export const ooccAdapter: EntityAdapter<OrdenCompra> =
  createEntityAdapter<OrdenCompra>({
    selectId: model => model.id,
    sortComparer: (a: OrdenCompra, b: OrdenCompra): number =>
      b.folio.toString().localeCompare(a.folio.toString())
  });

export interface State extends EntityState<OrdenCompra> {
  isLoading?: boolean;
  hasLoaded?: boolean;
  error?: any;
  count?: number;
  lastFolio?: number;
  isEditing?: boolean;
  nuevaOrdenCompra?: {
    draft: OrdenCompra,
    isEditing: boolean,
    isValid: boolean,
    isLoading: boolean,
    error?: any,
    newFolio?: any,
    url?: any;
    pdf?: any;
  };
}

export const initialState: State = ooccAdapter.getInitialState(
  {
    // isLoading: false,
    hasLoaded: false,
    lastFolio: 0,
  }
);