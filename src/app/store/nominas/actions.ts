import { Action } from '@ngrx/store';
import { NominaMensual } from 'src/app/models';

export enum ActionTypes {
  //load documents
  LoadRequest = '[Nominas Mensuales] load items',
  LoadSuccess = '[Nominas Mensuales] load items succeeded',
  LoadFailure = '[Nominas Mensuales] load items failed',

  //create document
  CreateRequest = '[Nominas Mensuales] create document',
  CreateSuccess = '[Nominas Mensuales] document successfully created',
  CreateFailure = '[Nominas Mensuales] create document failed',

  //delete document
  DeleteRequest = '[Nominas Mensuales] delete document',
  DeleteSuccess = '[Nominas Mensuales] document successfully deleted',
  DeleteFailure = '[Nominas Mensuales] delete document failed',

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
  constructor(public payload: { nomina: NominaMensual }) { }
}
export class CreateSuccess implements Action {
  readonly type = ActionTypes.CreateSuccess;
}
export class CreateFailure implements Action {
  readonly type = ActionTypes.CreateFailure;
  constructor(public payload: { error: string }) { }
}

// delete document
export class DeleteRequest implements Action {
  readonly type = ActionTypes.DeleteRequest;
  constructor(public payload: { id: any }) { }
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

  // delete document
  DeleteRequest |
  DeleteFailure |
  DeleteSuccess 

