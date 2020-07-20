import { Action } from '@ngrx/store';
import { Cotizacion, Cliente } from 'src/app/models';

export enum ActionTypes {

  LoadItems = '[Cotizaciones] Load Items',

  LoadingItems = '[Cotizaciones] Loading Items',
  LoadSucceeded = '[Cotizaciones] Load Succeeded',
  LoadFailed = '[Cotizaciones] Load Failed',

  ItemsLoaded = '[Cotizaciones] Items Loaded',

  InitializeBlankDraft = '[Nueva Cotizacion] Initialize Blank Draft',
  InitializeDraftFromPrevious = '[Nueva Cotizacion] Initialize Draft From Previous',

  InitializingDraft = '[Nueva Cotizacion] Initializing Draft',

  DraftInitialized = '[Nueva Cotizacion] Draft Initialized',

  OpenDraftEditor = '[Cotizaciones] Open Draft Editor',
  CloseDraftEditor = '[Cotizaciones] Close Draft Editor',

  DraftCleaned = "[Nueva Cotizacion] Document Draft Cleaned",

  MergeFormChanges = '[Nueva Cotizacion] Merge Form Changes',
  MergeClienteSelection = '[Nueva Cotizacion] Merge Cliente Selection',

  DraftModified = "[Nueva Cotizacion] Draft Modified",

  OpenClienteSelector = '[Nueva Cotizacion] Open Cliente Selector',
  CloseClienteSelector = '[Nueva Cotizacion] Close Cliente Selector',

  ShowPreview = '[Nueva Cotizacion] Show preview',

  MakePdf = '[Nueva Cotizacion] Make pdf',
  MakingPdf = '[Nueva Cotizacion] Making pdf',
  PdfSuccessfullyMade = '[Nueva Cotizacion] Pdf successfully made',
  MakePdfFailed = '[Nueva Cotizacion] Make pdf failed',

  GenerateDocument = '[Nueva Cotizacion] Generate document',

  CreateFirestoreDocument = '[Nueva Cotizacion] Create firestore document',
  CreatingFirestoreDocument = '[Nueva Cotizacion] Creating firestore document',
  FirestoreDocumentSuccessfullyCreated = '[Nueva Cotizacion] Firestore document successfully created',
  CreateFirestoreDocumentFailed = '[Nueva Cotizacion] Create firestore document failed',

  UploadToStorage = '[Nueva Cotizacion] Upload to storage',
  UploadingToStorage = '[Nueva Cotizacion] Uploading to storage',
  PdfSuccessfullyUploaded = '[Nueva Cotizacion] Pdf successfully uploaded',
  UploadToStorageFailed = '[Nueva Cotizacion] Upload to storage failed',

  UpdateFirestoreDocument = '[Nueva Cotizacion] Update firestore document',
  UpdatingFirestoreDocument = '[Nueva Cotizacion] Updating firestore document',
  FirestoreDocumentSuccessfullyUpdated = '[Nueva Cotizacion] Firestore document successfully updated',
  UpdateFirestoreDocumentFailed = '[Nueva Cotizacion] Update firestore document failed',


  makePdfAndShow = '[Cotizaciones] Make pdf and show'
}

export class LoadItems implements Action {
  readonly type = ActionTypes.LoadItems;
}

export class LoadingItems implements Action {
  readonly type = ActionTypes.LoadingItems;
}

export class LoadSucceeded implements Action {
  readonly type = ActionTypes.LoadSucceeded;
  constructor(public payload: { items: Cotizacion[] }) { }
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
  constructor(public payload: Cotizacion) { }
}

export class InitializingDraft implements Action {
  readonly type = ActionTypes.InitializingDraft;
  constructor(public payload: Cotizacion) { }
}

export class DraftInitialized implements Action {
  readonly type = ActionTypes.DraftInitialized;
  constructor(public payload: Cotizacion) { }
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
  constructor(public payload: Cotizacion) { }
}

export class MergeClienteSelection implements Action {
  readonly type = ActionTypes.MergeClienteSelection;
  constructor(public payload: Cliente) { }
}

export class DraftModified implements Action {
  readonly type = ActionTypes.DraftModified;
  constructor(public payload: Cotizacion) { }
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
  constructor(public payload: Cotizacion) { }
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

export class makePdfAndShow implements Action {
  readonly type = ActionTypes.makePdfAndShow;
  constructor(public payload: Cotizacion) { }
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
  UpdateFirestoreDocumentFailed |
  makePdfAndShow