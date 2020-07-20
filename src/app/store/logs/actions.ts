import { Action } from '@ngrx/store';
import { Log } from 'src/app/models';

export enum ActionTypes {
  //load
  LoadRequest = '[Logs] load items',
  LoadSuccess = '[Logs] load items succeeded',
  LoadFailure = '[Logs] load items failed',

  //create
  CreateRequest = '[Logs] create document',
  CreateSuccess = '[Logs] document successfully created',
  CreateFailure = '[Logs] create document failed',
}

// load documents
export class LoadRequest implements Action {
  readonly type = ActionTypes.LoadRequest;
  constructor(public payload: { limit?:number }) { }
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
  constructor(public payload: {
    tipo: string,
    coleccion: string,
    documento: string
  }) { }
}
export class CreateSuccess implements Action {
  readonly type = ActionTypes.CreateSuccess;
}
export class CreateFailure implements Action {
  readonly type = ActionTypes.CreateFailure;
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
  CreateSuccess 
