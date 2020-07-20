import { Action } from '@ngrx/store';
import { Trabajador } from 'src/app/models';

export enum ActionTypes {
  //load documents
  LoadRequest = '[Trabajadores] load items',
  LoadSuccess = '[Trabajadores] load items succeeded',
  LoadFailure = '[Trabajadores] load items failed',

  //create document
  CreateRequest = '[Trabajadores] create document',
  CreateSuccess = '[Trabajadores] document successfully created',
  CreateFailure = '[Trabajadores] create document failed',

  //update document
  UpdateRequest = '[Trabajadores] update document',
  UpdateSuccess = '[Trabajadores] document successfully updated',
  UpdateFailure = '[Trabajadores] update document failed',

  //delete document
  DeleteRequest = '[Trabajadores] delete document',
  DeleteSuccess = '[Trabajadores] document successfully deleted',
  DeleteFailure = '[Trabajadores] delete document failed',

}

// load documents
export class LoadRequest implements Action {
  readonly type = ActionTypes.LoadRequest;
}
export class LoadSuccess implements Action {
  readonly type = ActionTypes.LoadSuccess;
  constructor(public payload: { items: any[] }) { }
}
export class LoadFailure implements Action {
  readonly type = ActionTypes.LoadFailure;
  constructor(public payload: { error: string }) { }
}
// create document
export class CreateRequest implements Action {
  readonly type = ActionTypes.CreateRequest;
  constructor(public payload: { trabajador: Trabajador }) { }
}
export class CreateSuccess implements Action {
  readonly type = ActionTypes.CreateSuccess;
}
export class CreateFailure implements Action {
  readonly type = ActionTypes.CreateFailure;
  constructor(public payload: { error: string }) { }
}
// update document
export class UpdateRequest implements Action {
  readonly type = ActionTypes.UpdateRequest;
  constructor(public payload: { rut, changes: Trabajador }) { }
}
export class UpdateSuccess implements Action {
  readonly type = ActionTypes.UpdateSuccess;
}
export class UpdateFailure implements Action {
  readonly type = ActionTypes.UpdateFailure;
  constructor(public payload: { error: string }) { }
}
// delete document
export class DeleteRequest implements Action {
  readonly type = ActionTypes.DeleteRequest;
  constructor(public payload: { rut: string }) { }
}
export class DeleteSuccess implements Action {
  readonly type = ActionTypes.DeleteSuccess;
}
export class DeleteFailure implements Action {
  readonly type = ActionTypes.DeleteFailure;
  constructor(public payload: { error: string }) { }
}



export type Actions =
  // load documents
  LoadRequest |
  LoadSuccess |
  LoadFailure |

  // create document
  CreateRequest |
  CreateFailure |
  CreateSuccess |

  // update document
  UpdateRequest |
  UpdateFailure |
  UpdateSuccess |

  // delete document
  DeleteRequest |
  DeleteFailure |
  DeleteSuccess 

