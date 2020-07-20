import { Action } from '@ngrx/store';
import { Proyecto } from 'src/app/models';

export enum ActionTypes {
  //load documents
  LoadRequest = '[Proyecto] load items',
  LoadSuccess = '[Proyecto] load items succeeded',
  LoadFailure = '[Proyecto] load items failed',

  //create document
  CreateRequest = '[Proyecto] create document',
  CreateSuccess = '[Proyecto] document successfully created',
  CreateFailure = '[Proyecto] create document failed',

  //update document
  UpdateRequest = '[Proyecto] update document',
  UpdateSuccess = '[Proyecto] document successfully updated',
  UpdateFailure = '[Proyecto] update document failed',

  //delete document
  DeleteRequest = '[Proyecto] delete document',
  DeleteSuccess = '[Proyecto] document successfully deleted',
  DeleteFailure = '[Proyecto] delete document failed',

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
  constructor(public payload: { proyecto: Proyecto }) { }
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
  constructor(public payload: { id, proyecto: Proyecto }) { }
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
  constructor(public payload: { id }) { }
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

