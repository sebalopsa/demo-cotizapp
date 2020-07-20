import { Action } from '@ngrx/store';
import { OrdenCompra, Cliente } from 'src/app/models';

export enum ActionTypes {

  LoadItems = '[Oredenes de Compra] Load Items',

  LoadingItems = '[Oredenes de Compra] Loading Items',
  LoadSucceeded = '[Oredenes de Compra] Load Succeeded',
  LoadFailed = '[Oredenes de Compra] Load Failed',

  ItemsLoaded = '[Oredenes de Compra] Items Loaded',

  InitializeBlankDraft = '[Nueva Orden de Compra] Initialize Blank Draft',
  InitializeDraftFromPrevious = '[Nueva Orden de Compra] Initialize Draft From Previous',

  InitializingDraft = '[Nueva Orden de Compra] Initializing Draft',

  DraftInitialized = '[Nueva Orden de Compra] Draft Initialized',

  OpenDraftEditor = '[Oredenes de Compra] Open Draft Editor',
  CloseDraftEditor = '[Oredenes de Compra] Close Draft Editor',

  DraftCleaned = "[Nueva Orden de Compra] Document Draft Cleaned",

  MergeFormChanges = '[Nueva Orden de Compra] Merge Form Changes',
  MergeClienteSelection = '[Nueva Orden de Compra] Merge Cliente Selection',

  DraftModified = "[Nueva Orden de Compra] Draft Modified",

  OpenClienteSelector = '[Nueva Orden de Compra] Open Cliente Selector',
  CloseClienteSelector = '[Nueva Orden de Compra] Close Cliente Selector',

  ShowPreview = '[Nueva Orden de Compra] Show preview',

  MakePdf = '[Nueva Orden de Compra] Make pdf',
  MakingPdf = '[Nueva Orden de Compra] Making pdf',
  PdfSuccessfullyMade = '[Nueva Orden de Compra] Pdf successfully made',
  MakePdfFailed = '[Nueva Orden de Compra] Make pdf failed',

  GenerateDocument = '[Nueva Orden de Compra] Generate document',

  CreateFirestoreDocument = '[Nueva Orden de Compra] Create firestore document',
  CreatingFirestoreDocument = '[Nueva Orden de Compra] Creating firestore document',
  FirestoreDocumentSuccessfullyCreated = '[Nueva Orden de Compra] Firestore document successfully created',
  CreateFirestoreDocumentFailed = '[Nueva Orden de Compra] Create firestore document failed',

  UploadToStorage = '[Nueva Orden de Compra] Upload to storage',
  UploadingToStorage = '[Nueva Orden de Compra] Uploading to storage',
  PdfSuccessfullyUploaded = '[Nueva Orden de Compra] Pdf successfully uploaded',
  UploadToStorageFailed = '[Nueva Orden de Compra] Upload to storage failed',

  UpdateFirestoreDocument = '[Nueva Orden de Compra] Update firestore document',
  UpdatingFirestoreDocument = '[Nueva Orden de Compra] Updating firestore document',
  FirestoreDocumentSuccessfullyUpdated = '[Nueva Orden de Compra] Firestore document successfully updated',
  UpdateFirestoreDocumentFailed = '[Nueva Orden de Compra] Update firestore document failed',
}

export class LoadItems implements Action {
  readonly type = ActionTypes.LoadItems;
}

export class LoadingItems implements Action {
  readonly type = ActionTypes.LoadingItems;
}

export class LoadSucceeded implements Action {
  readonly type = ActionTypes.LoadSucceeded;
  constructor(public payload: { items: OrdenCompra[] }) { }
}

export class LoadFailed implements Action {
  readonly type = ActionTypes.LoadFailed;
  constructor(public payload: { error: string }) { }
}

export class ItemsLoaded implements Action {
  readonly type = ActionTypes.ItemsLoaded;
}

export class InitializeBlankDraft implements Action {
  readonly type = ActionTypes.InitializeBlankDraft;
}

export class InitializeDraftFromPrevious implements Action {
  readonly type = ActionTypes.InitializeDraftFromPrevious;
  constructor(public payload: OrdenCompra) { }
}

export class InitializingDraft implements Action {
  readonly type = ActionTypes.InitializingDraft;
  constructor(public payload: OrdenCompra) { }
}

export class DraftInitialized implements Action {
  readonly type = ActionTypes.DraftInitialized;
  constructor(public payload: OrdenCompra) { }
}

export class OpenDraftEditor implements Action {
  readonly type = ActionTypes.OpenDraftEditor;
}

export class CloseDraftEditor implements Action {
  readonly type = ActionTypes.CloseDraftEditor;
}

export class DraftCleaned implements Action {
  readonly type = ActionTypes.DraftCleaned;
}

export class MergeFormChanges implements Action {
  readonly type = ActionTypes.MergeFormChanges;
  constructor(public payload: OrdenCompra) { }
}

export class MergeClienteSelection implements Action {
  readonly type = ActionTypes.MergeClienteSelection;
  constructor(public payload: Cliente) { }
}

export class DraftModified implements Action {
  readonly type = ActionTypes.DraftModified;
  constructor(public payload: OrdenCompra) { }
}

export class OpenClienteSelector implements Action {
  readonly type = ActionTypes.OpenClienteSelector;
}

export class CloseClienteSelector implements Action {
  readonly type = ActionTypes.CloseClienteSelector;
}

export class ShowPreview implements Action {
  readonly type = ActionTypes.ShowPreview;
}

export class MakePdf implements Action {
  readonly type = ActionTypes.MakePdf;
  constructor(public payload: OrdenCompra) { }
}

export class MakingPdf implements Action {
  readonly type = ActionTypes.MakingPdf;
}

export class PdfSuccessfullyMade implements Action {
  readonly type = ActionTypes.PdfSuccessfullyMade;
  constructor(public payload?: any) { }
}

export class MakePdfFailed implements Action {
  readonly type = ActionTypes.MakePdfFailed;
  constructor(public payload: { error: any }) { }
}

export class GenerateDocument implements Action {
  readonly type = ActionTypes.GenerateDocument;
}

export class CreateFirestoreDocument implements Action {
  readonly type = ActionTypes.CreateFirestoreDocument;
  constructor(public payload: any) { }
}

export class CreatingFirestoreDocument implements Action {
  readonly type = ActionTypes.CreatingFirestoreDocument;
}

export class FirestoreDocumentSuccessfullyCreated implements Action {
  readonly type = ActionTypes.FirestoreDocumentSuccessfullyCreated;
  constructor(public payload: any) { }
}

export class CreateFirestoreDocumentFailed implements Action {
  readonly type = ActionTypes.CreateFirestoreDocumentFailed;
  constructor(public payload: { error: any }) { }
}

export class UploadToStorage implements Action {
  readonly type = ActionTypes.UploadToStorage;
  constructor(public payload: any) { }
}

export class UploadingToStorage implements Action {
  readonly type = ActionTypes.UploadingToStorage;
}

export class PdfSuccessfullyUploaded implements Action {
  readonly type = ActionTypes.PdfSuccessfullyUploaded;
  constructor(public payload: any) { }
}

export class UploadToStorageFailed implements Action {
  readonly type = ActionTypes.UploadToStorageFailed;
  constructor(public payload: { error: any }) { }
}


export class UpdateFirestoreDocument implements Action {
  readonly type = ActionTypes.UpdateFirestoreDocument;
  constructor(public payload: { folio: any, changes: any }) { }
}

export class UpdatingFirestoreDocument implements Action {
  readonly type = ActionTypes.UpdatingFirestoreDocument;
}

export class FirestoreDocumentSuccessfullyUpdated implements Action {
  readonly type = ActionTypes.FirestoreDocumentSuccessfullyUpdated;
}

export class UpdateFirestoreDocumentFailed implements Action {
  readonly type = ActionTypes.UpdateFirestoreDocumentFailed;
  constructor(public payload: { error: any }) { }
}






export type Actions =
  LoadItems |

  LoadingItems |
  LoadSucceeded |
  LoadFailed |

  ItemsLoaded |

  InitializeBlankDraft |
  InitializeDraftFromPrevious |

  InitializingDraft |

  DraftInitialized |

  OpenDraftEditor |
  CloseDraftEditor |

  DraftCleaned |

  MergeFormChanges |
  MergeClienteSelection |

  DraftModified |

  OpenClienteSelector |
  CloseClienteSelector |

  ShowPreview |

  MakePdf |
  MakingPdf |
  PdfSuccessfullyMade |
  MakePdfFailed |

  GenerateDocument |

  CreateFirestoreDocument |
  CreatingFirestoreDocument |
  FirestoreDocumentSuccessfullyCreated |
  CreateFirestoreDocumentFailed |

  UploadToStorage |
  UploadingToStorage |
  PdfSuccessfullyUploaded |
  UploadToStorageFailed |

  UpdateFirestoreDocument |
  UpdatingFirestoreDocument |
  FirestoreDocumentSuccessfullyUpdated |
  UpdateFirestoreDocumentFailed 