import { Action } from '@ngrx/store';
import { TrabajadorDocumento } from 'src/app/models';

export enum ActionTypes {
  //load documents
  LoadRequest = '[Trabajadores Documentos] load items',
  LoadSuccess = '[Trabajadores Documentos] load items succeeded',
  LoadFailure = '[Trabajadores Documentos] load items failed',

  //create document
  CreateRequest = '[Trabajadores Documentos] create document',
  CreateSuccess = '[Trabajadores Documentos] document successfully created',
  CreateFailure = '[Trabajadores Documentos] create document failed',

  //update document
  UpdateRequest = '[Trabajadores Documentos] update document',
  UpdateSuccess = '[Trabajadores Documentos] document successfully updated',
  UpdateFailure = '[Trabajadores Documentos] update document failed',

  //delete document
  DeleteRequest = '[Trabajadores Documentos] delete document',
  DeleteSuccess = '[Trabajadores Documentos] document successfully deleted',
  DeleteFailure = '[Trabajadores Documentos] delete document failed',

  //delete document
  UploadRequest = '[Trabajadores Documentos] upload document file',
  UploadSuccess = '[Trabajadores Documentos] document file successfully uploadd',
  UploadFailure = '[Trabajadores Documentos] upload document file failed',

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
  constructor(public payload: { rut: string, documento: TrabajadorDocumento, file: File }) { }
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
  constructor(public payload: { id, changes: TrabajadorDocumento }) { }
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
  constructor(public payload: { id: string }) { }
}
export class DeleteSuccess implements Action {
  readonly type = ActionTypes.DeleteSuccess;
}
export class DeleteFailure implements Action {
  readonly type = ActionTypes.DeleteFailure;
  constructor(public payload: { error: string }) { }
}

export class UploadRequest implements Action {
  readonly type = ActionTypes.UploadRequest;
  constructor(public payload: {id: any, file:File}) { }
}

export class UploadSuccess implements Action {
  readonly type = ActionTypes.UploadSuccess;
  constructor() { }
}

export class UploadFailure implements Action {
  readonly type = ActionTypes.UploadFailure;
  constructor(public payload: { error: any }) { }
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
  DeleteSuccess |

  // upload document file
  UploadRequest |
  UploadFailure |
  UploadSuccess

