import { User } from '../../models';

export interface State {
  user?: User | null;
  authenticated?: boolean;
  loading?: boolean;
  error?: string;
}

export const initialState: State = {
  // user: null,
  // authenticated: undefined,
  // loading: false,
  // error: null
}