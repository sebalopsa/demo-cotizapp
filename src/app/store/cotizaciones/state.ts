import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Cotizacion } from '../../models';

export const cotizacionesAdapter: EntityAdapter<Cotizacion> =
  createEntityAdapter<Cotizacion>({
    selectId: model => model.id,
    sortComparer: (a: Cotizacion, b: Cotizacion): number =>
      b.folio.toString().localeCompare(a.folio.toString())
  });

export interface State extends EntityState<Cotizacion> {
  isLoading?: boolean;
  hasLoaded?: boolean;
  error?: any;
  count?: number;
  lastFolio?: number;
  isEditing?: boolean;
  nuevaCotizacion?: {
    draft: Cotizacion,
    isEditing: boolean,
    isValid: boolean,
    isLoading: boolean,
    error?: any,
    newFolio?: any,
    url?: any;
    pdf?: any;
  };
}

export const initialState: State = cotizacionesAdapter.getInitialState(
  {
    // isLoading: false,
    hasLoaded: false,
    lastFolio: 0,
    // nuevaCotizacion: null
  }
);