import { Action } from '@ngrx/store';
import { EstadoPago, Cliente } from 'src/app/models';

export enum ActionTypes {

  LoadItems = '[Estado de Pago] Load Items',

  LoadingItems = '[Estado de Pago] Loading Items',
  LoadSucceeded = '[Estado de Pago] Load Succeeded',
  LoadFailed = '[Estado de Pago] Load Failed',

  ItemsLoaded = '[Estado de Pago] Items Loaded',

  InitializeBlankDraft = '[Nuevo Estado de Pago] Initialize Blank Draft',
  InitializeDraftFromPrevious = '[Nuevo Estado de Pago] Initialize Draft From Previous',

  InitializingDraft = '[Nuevo Estado de Pago] Initializing Draft',

  DraftInitialized = '[Nuevo Estado de Pago] Draft Initialized',

  OpenDraftEditor = '[Estado de Pago] Open Draft Editor',
  CloseDraftEditor = '[Estado de Pago] Close Draft Editor',

  DraftCleaned = "[Nuevo Estado de Pago] Document Draft Cleaned",

  MergeFormChanges = '[Nuevo Estado de Pago] Merge Form Changes',
  MergeClienteSelection = '[Nuevo Estado de Pago] Merge Cliente Selection',

  DraftModified = "[Nuevo Estado de Pago] Draft Modified",

  OpenClienteSelector = '[Nuevo Estado de Pago] Open Cliente Selector',
  CloseClienteSelector = '[Nuevo Estado de Pago] Close Cliente Selector',

  ShowPreview = '[Nuevo Estado de Pago] Show preview',

  MakePdf = '[Nuevo Estado de Pago] Make pdf',
  MakingPdf = '[Nuevo Estado de Pago] Making pdf',
  PdfSuccessfullyMade = '[Nuevo Estado de Pago] Pdf successfully made',
  MakePdfFailed = '[Nuevo Estado de Pago] Make pdf failed',

  GenerateDocument = '[Nuevo Estado de Pago] Generate document',

  CreateFirestoreDocument = '[Nuevo Estado de Pago] Create firestore document',
  CreatingFirestoreDocument = '[Nuevo Estado de Pago] Creating firestore document',
  FirestoreDocumentSuccessfullyCreated = '[Nuevo Estado de Pago] Firestore document successfully created',
  CreateFirestoreDocumentFailed = '[Nuevo Estado de Pago] Create firestore document failed',

  UploadToStorage = '[Nuevo Estado de Pago] Upload to storage',
  UploadingToStorage = '[Nuevo Estado de Pago] Uploading to storage',
  PdfSuccessfullyUploaded = '[Nuevo Estado de Pago] Pdf successfully uploaded',
  UploadToStorageFailed = '[Nuevo Estado de Pago] Upload to storage failed',

  UpdateFirestoreDocument = '[Nuevo Estado de Pago] Update firestore document',
  UpdatingFirestoreDocument = '[Nuevo Estado de Pago] Updating firestore document',
  FirestoreDocumentSuccessfullyUpdated = '[Nuevo Estado de Pago] Firestore document successfully updated',
  UpdateFirestoreDocumentFailed = '[Nuevo Estado de Pago] Update firestore document failed',
}

export class LoadItems implements Action {
  readonly type = ActionTypes.LoadItems;
}

export class LoadingItems implements Action {
  readonly type = ActionTypes.LoadingItems;
}

export class LoadSucceeded implements Action {
  readonly type = ActionTypes.LoadSucceeded;
  constructor(public payload: { items: EstadoPago[] }) { }
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
  constructor(public payload: EstadoPago) { }
}

export class InitializingDraft implements Action {
  readonly type = ActionTypes.InitializingDraft;
  constructor(public payload: EstadoPago) { }
}

export class DraftInitialized implements Action {
  readonly type = ActionTypes.DraftInitialized;
  constructor(public payload: EstadoPago) { }
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
  constructor(public payload: EstadoPago) { }
}

export class MergeClienteSelection implements Action {
  readonly type = ActionTypes.MergeClienteSelection;
  constructor(public payload: Cliente) { }
}

export class DraftModified implements Action {
  readonly type = ActionTypes.DraftModified;
  constructor(public payload: EstadoPago) { }
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
  constructor(public payload: EstadoPago) { }
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