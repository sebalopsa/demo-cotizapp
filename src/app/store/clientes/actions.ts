import { Action } from '@ngrx/store';
import { Cliente } from 'src/app/models';

export enum ActionTypes {
  LoadItems = '[Clientes] Load Items',

  LoadRequested = '[Clientes] Load Requested',
  LoadSucceeded = '[Clientes] Load Succeeded',
  LoadFailed = '[Clientes] Load Failed',

  ItemsLoaded = '[Clientes] Items Loaded',

  AddNew = '[Clientes] Add New',
  EditOne = "[Clientes] Edit One",

  EditingStarted = "[Clientes] Editing Started",
  EditingFinished = '[Clientes] Editing Finished',
  FormChanged = '[Cliente Edit] Form Changed',

  DiscardChanges = '[Cliente Edit] Discard Changes',
  SaveChanges = '[Cliente Edit] Save Changes',

  CreateClienteRequested = '[Clientes] Create Cliente Requested',
  CreateClienteSucceeded = '[Clientes] Create Cliente Succeeded',
  CreateClienteFailed = '[Clientes] Create Cliente Failed',

  UpdateClienteRequested = '[Clientes] Update Cliente Requested',
  UpdateClienteSucceeded = '[Clientes] Update Cliente Succeeded',
  UpdateClienteFailed = '[Clientes] Update Cliente Failed',

  DeleteOne = '[Clientes] Delete One',

  DeleteClienteRequested = '[Clientes] Delete Cliente Requested',
  DeleteClienteSucceeded = '[Clientes] Delete Cliente Succeeded',
  DeleteClienteFailed = '[Clientes] Delete Cliente Failed',
}

export class LoadItems implements Action {
  readonly type = ActionTypes.LoadItems;
}

export class LoadRequested implements Action {
  readonly type = ActionTypes.LoadRequested;
}

export class LoadSucceeded implements Action {
  readonly type = ActionTypes.LoadSucceeded;
  constructor(public payload: { items: Cliente[] }) { }
}

export class LoadFailed implements Action {
  readonly type = ActionTypes.LoadFailed;
  constructor(public payload: { error: string }) { }
}

export class ItemsLoaded implements Action {
  readonly type = ActionTypes.ItemsLoaded;
}

export class AddNew implements Action {
  readonly type = ActionTypes.AddNew;
}

export class EditOne implements Action {
  readonly type = ActionTypes.EditOne;
  constructor(public payload: Cliente) { }
}

export class EditingStarted implements Action {
  readonly type = ActionTypes.EditingStarted;
  constructor(public payload: Cliente) { }
}

export class EditingFinished implements Action {
  readonly type = ActionTypes.EditingFinished;
}

export class FormChanged implements Action {
  readonly type = ActionTypes.FormChanged;
  constructor(public payload: Cliente) { }
}

export class DiscardChanges implements Action {
  readonly type = ActionTypes.DiscardChanges;
}

export class SaveChanges implements Action {
  readonly type = ActionTypes.SaveChanges;
}

export class CreateClienteRequested implements Action {
  readonly type = ActionTypes.CreateClienteRequested;
  constructor(public payload: Cliente) { }
}

export class CreateClienteSucceeded implements Action {
  readonly type = ActionTypes.CreateClienteSucceeded;
}

export class CreateClienteFailed implements Action {
  readonly type = ActionTypes.CreateClienteFailed;
  constructor(public payload: { error: string }) { }
}

export class UpdateClienteRequested implements Action {
  readonly type = ActionTypes.UpdateClienteRequested;
  constructor(public payload: Cliente) { }
}

export class UpdateClienteSucceeded implements Action {
  readonly type = ActionTypes.UpdateClienteSucceeded;
}

export class UpdateClienteFailed implements Action {
  readonly type = ActionTypes.UpdateClienteFailed;
  constructor(public payload: { error: string }) { }
}

export class DeleteOne implements Action {
  readonly type = ActionTypes.DeleteOne;
  constructor(public payload: string) { }
}

export class DeleteClienteRequested implements Action {
  readonly type = ActionTypes.DeleteClienteRequested;
  constructor(public payload: string) { }
}

export class DeleteClienteSucceeded implements Action {
  readonly type = ActionTypes.DeleteClienteSucceeded;
}

export class DeleteClienteFailed implements Action {
  readonly type = ActionTypes.DeleteClienteFailed;
  constructor(public payload: { error: string }) { }
}


export type Actions =
  LoadItems |

  LoadRequested |
  LoadSucceeded |
  LoadFailed |

  ItemsLoaded |

  AddNew |
  EditOne |

  EditingStarted |
  EditingFinished |
  FormChanged |

  DiscardChanges |
  SaveChanges |

  CreateClienteRequested |
  CreateClienteSucceeded |
  CreateClienteFailed |

  UpdateClienteRequested |
  UpdateClienteSucceeded |
  UpdateClienteFailed |

  DeleteOne |

  DeleteClienteRequested |
  DeleteClienteSucceeded |
  DeleteClienteFailed

