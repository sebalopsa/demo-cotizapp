import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { EstadoPago } from '../../models';

export const eeppAdapter: EntityAdapter<EstadoPago> =
  createEntityAdapter<EstadoPago>({
    selectId: model => model.id,
    sortComparer: (a: EstadoPago, b: EstadoPago): number =>
      b.folio.toString().localeCompare(a.folio.toString())
  });

export interface State extends EntityState<EstadoPago> {
  isLoading?: boolean;
  hasLoaded?: boolean;
  error?: any;
  count?: number;
  lastFolio?: number;
  isEditing?: boolean;
  nuevoEstadoPago?: {
    draft: EstadoPago,
    isEditing: boolean,
    isValid: boolean,
    isLoading: boolean,
    error?: any,
    newFolio?: any,
    url?: any;
    pdf?: any;
  };
}

export const initialState: State = eeppAdapter.getInitialState(
  {
    // isLoading: false,
    hasLoaded: false,
    lastFolio: 0,
    // nuevaCotizacion: null
  }
);