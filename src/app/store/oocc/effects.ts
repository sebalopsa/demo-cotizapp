import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of as observableOf, from as observableFrom } from 'rxjs';
import { catchError, map, flatMap, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import * as ooccActions from './actions';
import { OoccFacadeService } from './facade';
import { NavigationStoreActions } from '../navigation';
import { UiStoreActions } from '../ui';
import { RoccflexFacadeService } from '../roccflex/facade';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PdfOcService } from 'src/app/services/pdf-oc.service';
import { OrdenCompra } from 'src/app/models';
import { StorageService } from 'src/app/services/storage.service';
import { LogsStoreActions } from '../logs';

@Injectable()
export class OoccStoreEffects {
    constructor(
        private firestoreService: FirestoreService,
        private actions$: Actions,
        private ocFacadeSrv: OoccFacadeService,
        private roccflexFacadeSrv: RoccflexFacadeService,
        private pdfSrv: PdfOcService,
        private store$: Store<any>,
        private storageSrv: StorageService,
    ) { }

    //CARGAR ITEMS SI NO ESTAN CARGADOS
    @Effect()
    loadItems$: Observable<Action> = this.actions$.pipe(
        ofType<ooccActions.LoadItems>(
            ooccActions.ActionTypes.LoadItems
        ),
        withLatestFrom(this.ocFacadeSrv.hasLoaded$),
        map(([_, hasLoaded]) => hasLoaded ?
            new ooccActions.ItemsLoaded() :
            new ooccActions.LoadingItems()
        )
    )

    //CARGAR ITEMS DESDE FIRESTORE
    @Effect()
    loadFromFirestore$: Observable<Action> = this.actions$.pipe(
        ofType<ooccActions.LoadingItems>(
            ooccActions.ActionTypes.LoadingItems
        ),
        switchMap(_ => this.firestoreService.getItems('oocc', true)),
        map(items => new ooccActions.LoadSucceeded({ items })),
        catchError(error => observableOf(new ooccActions.LoadFailed({ error })))
    )

    //CREAR NUEVA EN BLANCO
    @Effect()
    initializeBlankDraft$: Observable<Action> = this.actions$.pipe(
        ofType<ooccActions.InitializeBlankDraft>(
            ooccActions.ActionTypes.InitializeBlankDraft
        ),
        map(_ =>
            new ooccActions.InitializingDraft(this.fromZero()),
        )
    )

    //CREAR NUEVA A PARTIR DE ANTERIOR
    @Effect()
    initializeDraftFromPrevious$: Observable<Action> = this.actions$.pipe(
        ofType<ooccActions.InitializeDraftFromPrevious>(
            ooccActions.ActionTypes.InitializeDraftFromPrevious
        ),
        map(action => action.payload),
        map(draft =>
            new ooccActions.InitializingDraft(draft),
        )
    )

    //PREPARAR DOCUMENTO PARA EMPEZAR A EDITAR
    @Effect()
    initializeDraft$: Observable<Action> = this.actions$.pipe(
        ofType<ooccActions.InitializingDraft>(
            ooccActions.ActionTypes.InitializingDraft
        ),
        map(action => action.payload),
        map(draft => this.clean(draft)),
        withLatestFrom(this.roccflexFacadeSrv.empresas$),
        map(([draft, empresas]) => ({ ...draft, ...this.calcularTotales(draft), emisor: empresas['761328344'] })),
        flatMap(draft => [
            new ooccActions.DraftInitialized(draft),
            new ooccActions.OpenDraftEditor()
        ])
    )

    //ABRIR EDITOR NUEVA OC
    @Effect()
    openDraftEditor$: Observable<Action> = this.actions$.pipe(
        ofType<ooccActions.OpenDraftEditor>(
            ooccActions.ActionTypes.OpenDraftEditor
        ),
        flatMap(_ => [
            new NavigationStoreActions.GoTo({ path: ['', 'oocc', 'nueva'] }),
            new UiStoreActions.SidebarCollapsed()
        ])
    )

    //CERRAR EDITOR DE NUEVA-OC
    @Effect()
    closeDraftEditor$: Observable<Action> = this.actions$.pipe(
        ofType<ooccActions.CloseDraftEditor>(
            ooccActions.ActionTypes.CloseDraftEditor
        ),
        map(_ => new ooccActions.DraftCleaned())
    )

    //CUANDO HAY CAMBIOS EN FORMULARIO DE NUEVA OC   
    @Effect()
    mergeFormChanges$: Observable<Action> = this.actions$.pipe(
        ofType<ooccActions.MergeFormChanges>(
            ooccActions.ActionTypes.MergeFormChanges
        ),
        map(actions => actions.payload),
        map(formValue => ({
            ...formValue,
            ...this.calcularTotales(formValue),
            fecha: new Date(formValue.fechaStr).setUTCHours(12, 0, 0, 0)
        })),
        map(changes =>
            new ooccActions.DraftModified(changes)
        )
    )

    //CUANDO SE SELECCIONA CLIENTE  
    @Effect()
    mergeClienteSelection$: Observable<Action> = this.actions$.pipe(
        ofType<ooccActions.MergeClienteSelection>(
            ooccActions.ActionTypes.MergeClienteSelection
        ),
        flatMap(action => [
            new ooccActions.DraftModified({ cliente: action.payload }),
            new ooccActions.CloseClienteSelector(),
        ])
    )
    //ABRIR MODAL SELECCIONAR CLIENTE    
    @Effect()
    openClienteSelection$: Observable<Action> = this.actions$.pipe(
        ofType<ooccActions.OpenClienteSelector>(
            ooccActions.ActionTypes.OpenClienteSelector
        ),
        map(() => new UiStoreActions.ModalOpened('select-cliente'))
    )
    //CERRAR MODAL SELECCIONAR CLIENTE    
    @Effect()
    closeClienteSelection$: Observable<Action> = this.actions$.pipe(
        ofType<ooccActions.CloseClienteSelector>(
            ooccActions.ActionTypes.CloseClienteSelector
        ),
        map(() => new UiStoreActions.ModalClosed())
    )

    // VISTA PREVIA
    @Effect()
    showPreview$: Observable<Action> = this.actions$.pipe(
        ofType<ooccActions.ShowPreview>(
            ooccActions.ActionTypes.ShowPreview
        ),
        tap(_ => this.store$.dispatch(new ooccActions.MakingPdf())),
        withLatestFrom(this.ocFacadeSrv.nuevaOrdenCompra$),
        switchMap(([_, cot]) =>
            observableFrom(
                new Promise(resolve => {
                    this.pdfSrv.generar(cot.draft, true).getDataUrl(val => resolve(val))
                })
            ).pipe(
                flatMap(url => [
                    new ooccActions.PdfSuccessfullyMade(),
                    new UiStoreActions.OpenPdfView(url)
                ]),
                catchError(error => observableOf(new ooccActions.MakePdfFailed({ error: error })))
            ),
        ),
    )

    // GENERAR NUEVA OC
    @Effect()
    generateDocument$: Observable<Action> = this.actions$.pipe(
        ofType<ooccActions.GenerateDocument>(
            ooccActions.ActionTypes.GenerateDocument
        ),
        withLatestFrom(this.ocFacadeSrv.nuevaOrdenCompra$),
        map(([_, newDocument]) => new ooccActions.CreateFirestoreDocument(newDocument.draft)),
    )

    // CREAR DOCUMENTO CON FOLIO EN FIRESTORE 
    @Effect()
    createFirestoreDocument$: Observable<Action> = this.actions$.pipe(
        ofType<ooccActions.CreateFirestoreDocument>(
            ooccActions.ActionTypes.CreateFirestoreDocument
        ),
        map(action => action.payload),
        tap(draft => this.store$.dispatch(new ooccActions.CreatingFirestoreDocument())),
        withLatestFrom(this.ocFacadeSrv.lastFolio$),
        map(([draft, lastFolio]) => ({ ...draft, folio: lastFolio + 1 })),
        switchMap((newDocument: OrdenCompra) => observableFrom(this.firestoreService.set('oocc', String(newDocument.folio), newDocument).then(
            () => newDocument
        )).pipe(
            flatMap(newDocument => [
                new ooccActions.FirestoreDocumentSuccessfullyCreated(newDocument.folio),
                new ooccActions.MakePdf(newDocument),
                new LogsStoreActions.CreateRequest({
                    tipo: 'CREAR',
                    coleccion: 'oocc',
                    documento: String(newDocument.id)
                })
            ]),
            catchError(error => observableOf(new ooccActions.CreateFirestoreDocumentFailed({ error })))
        ))
    )

    // HACER PDF
    @Effect()
    makePdf$: Observable<Action> = this.actions$.pipe(
        ofType<ooccActions.MakePdf>(
            ooccActions.ActionTypes.MakePdf
        ),
        map(action => action.payload),
        tap(_ => this.store$.dispatch(new ooccActions.MakingPdf())),
        switchMap(newDocument =>
            observableFrom(
                new Promise(resolve => {
                    this.pdfSrv.generar(newDocument, false).getBlob(val => resolve(val))
                })
            ).pipe(
                // map(pdf => ([pdf, newDocument.folio])),
                flatMap(pdf => [
                    new ooccActions.PdfSuccessfullyMade(),
                    new ooccActions.UploadToStorage({ blob: pdf, folio: newDocument.folio }),
                ]),
                catchError(error => observableOf(new ooccActions.MakePdfFailed({ error: error })))
            ),
        ),
    )

    // SUBIR PDF A STORAGE
    @Effect()
    uploadToStorage$: Observable<Action> = this.actions$.pipe(
        ofType<ooccActions.UploadToStorage>(
            ooccActions.ActionTypes.UploadToStorage
        ),
        map(action => action.payload),
        tap(_ => this.store$.dispatch(new ooccActions.UploadingToStorage())),
        switchMap(payload =>
            observableFrom(this.storageSrv.put('oocc/OC' + payload.folio+'.pdf', payload.blob)
                .then((snapshot) => snapshot.ref.getDownloadURL())
                .then(url => ([url, payload.folio]))
            ).pipe(
                flatMap(([url, folio]) => [
                    new ooccActions.PdfSuccessfullyUploaded(url),
                    new ooccActions.UpdateFirestoreDocument({ folio, changes: { url: url } }),
                ]),
                catchError(error => observableOf(new ooccActions.UploadToStorageFailed({ error: error })))
            )),
    )
    //  ACTUALIZAR URL DE LA OC EN FIRESTORE
    @Effect()
    updateFirestoreDocument$: Observable<Action> = this.actions$.pipe(
        ofType<ooccActions.UpdateFirestoreDocument>(
            ooccActions.ActionTypes.UpdateFirestoreDocument
        ),
        map(action => action.payload),
        tap(_ => this.store$.dispatch(new ooccActions.UpdatingFirestoreDocument())),
        switchMap(payload => observableFrom(this.firestoreService.set('oocc', String(payload.folio), payload.changes)).pipe(
            flatMap(url => [
                new ooccActions.FirestoreDocumentSuccessfullyUpdated(),
                new NavigationStoreActions.GoTo({ path: ['oocc'] })
            ]),
            catchError(error => observableOf(new ooccActions.UpdateFirestoreDocumentFailed({ error: error })))
        )),
    )


















    fromZero(): OrdenCompra {
        return {
            divisa: 'CLP',
            detalle: [
                { descripcion: "Item por definir", cantidad: 1, unidad: "un", precio_unitario: 1000, subtotal: 1000 },
            ]
        }
    }

    clean(c): OrdenCompra {
        delete c.id;
        delete c.folio;
        delete c.nombreCliente;
        delete c.url;
        c.fecha = new Date().setUTCHours(12, 0, 0, 0);
        c.fechaStr = this.formatDate(c.fecha);
        c.estado = 'pendiente'
        return c
    }

    calcularTotales(c) {
        if (c.detalle) {
            c.detalle = c.detalle.map(item => { item.subtotal = item.cantidad * item.precio_unitario; return item })
            let subtotal = c.detalle.map(item => item.subtotal).reduce(function (total, n) { return total + Number(n); }, 0);
            let montoUtilidad = subtotal * c.porcentajeUtilidad / 100;
            let totalNeto = subtotal + montoUtilidad;
            let iva = totalNeto * 0.19;
            let total = totalNeto + iva
            let totales = {
                detalle: c.detalle,
                subtotal: subtotal,
                montoUtilidad: montoUtilidad,
                totalNeto: totalNeto,
                iva: iva,
                total: total
            }
            return totales
        }
        else return {}
    }

    formatDate(fecha?) {
        var d = new Date(fecha ? fecha : null),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
}