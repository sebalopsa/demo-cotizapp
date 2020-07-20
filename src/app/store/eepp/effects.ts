import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of as observableOf, from as observableFrom } from 'rxjs';
import { catchError, map, flatMap, switchMap, withLatestFrom, filter, tap, takeWhile, first } from 'rxjs/operators';
import * as eeppActions from './actions';
import { EeppFacadeService } from './facade';
import { NavigationStoreActions } from '../navigation';
import { UiStoreActions } from '../ui';
import { RoccflexFacadeService } from '../roccflex/facade';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PdfEpService } from 'src/app/services/pdf-ep.service';
import { EstadoPago } from 'src/app/models';
import { StorageService } from 'src/app/services/storage.service';
import { LogsStoreActions } from '../logs';

@Injectable()
export class EeppStoreEffects {
    constructor(
        private firestoreService: FirestoreService,
        private actions$: Actions,
        private epFacadeSrv: EeppFacadeService,
        private roccflexFacadeSrv: RoccflexFacadeService,
        private pdfSrv: PdfEpService,
        private store$: Store<any>,
        private storageSrv: StorageService,
    ) { }

    //CARGAR ITEMS SI NO ESTAN CARGADOS
    @Effect()
    loadItems$: Observable<Action> = this.actions$.pipe(
        ofType<eeppActions.LoadItems>(
            eeppActions.ActionTypes.LoadItems
        ),
        withLatestFrom(this.epFacadeSrv.hasLoaded$),
        map(([_, hasLoaded]) => hasLoaded ?
            new eeppActions.ItemsLoaded() :
            new eeppActions.LoadingItems()
        )
    )

    //CARGAR ITEMS DESDE FIRESTORE
    @Effect()
    loadFromFirestore$: Observable<Action> = this.actions$.pipe(
        ofType<eeppActions.LoadingItems>(
            eeppActions.ActionTypes.LoadingItems
        ),
        switchMap(_ => this.firestoreService.getItems('eepp', true)),
        map(items => new eeppActions.LoadSucceeded({ items })),
        catchError(error => observableOf(new eeppActions.LoadFailed({ error })))
    )

    //CREAR NUEVA EN BLANCO
    @Effect()
    initializeBlankDraft$: Observable<Action> = this.actions$.pipe(
        ofType<eeppActions.InitializeBlankDraft>(
            eeppActions.ActionTypes.InitializeBlankDraft
        ),
        map(_ =>
            new eeppActions.InitializingDraft(this.fromZero()),
        )
    )

    //CREAR NUEVA A PARTIR DE ANTERIOR
    @Effect()
    initializeDraftFromPrevious$: Observable<Action> = this.actions$.pipe(
        ofType<eeppActions.InitializeDraftFromPrevious>(
            eeppActions.ActionTypes.InitializeDraftFromPrevious
        ),
        map(action => action.payload),
        map(draft =>
            new eeppActions.InitializingDraft(draft),
        )
    )

    //PREPARAR DOCUMENTO PARA EMPEZAR A EDITAR
    @Effect()
    initializeDraft$: Observable<Action> = this.actions$.pipe(
        ofType<eeppActions.InitializingDraft>(
            eeppActions.ActionTypes.InitializingDraft
        ),
        map(action => action.payload),
        map(draft => this.clean(draft)),
        withLatestFrom(this.roccflexFacadeSrv.empresas$),
        map(([draft, empresas]) => ({ ...draft, ...this.calcularTotales(draft), emisor: empresas['761328344'] })),
        flatMap(draft => [
            new eeppActions.DraftInitialized(draft),
            new eeppActions.OpenDraftEditor()
        ])
    )

    //ABRIR EDITOR NUEVA ESTADO DE PAGO
    @Effect()
    openDraftEditor$: Observable<Action> = this.actions$.pipe(
        ofType<eeppActions.OpenDraftEditor>(
            eeppActions.ActionTypes.OpenDraftEditor
        ),
        flatMap(_ => [
            new NavigationStoreActions.GoTo({ path: ['', 'eepp', 'nuevo'] }),
            new UiStoreActions.SidebarCollapsed()
        ])
    )

    //CERRAR EDITOR DE NUEVO-ESTADO DE PAGO
    @Effect()
    closeDraftEditor$: Observable<Action> = this.actions$.pipe(
        ofType<eeppActions.CloseDraftEditor>(
            eeppActions.ActionTypes.CloseDraftEditor
        ),
        map(_ => new eeppActions.DraftCleaned())
    )

    //CUANDO HAY CAMBIOS EN FORMULARIO DE NUEVO ESTADO DE PAGO   
    @Effect()
    mergeFormChanges$: Observable<Action> = this.actions$.pipe(
        ofType<eeppActions.MergeFormChanges>(
            eeppActions.ActionTypes.MergeFormChanges
        ),
        map(actions => actions.payload),
        map(formValue => ({
            ...formValue,
            ...this.calcularTotales(formValue),
            fecha: new Date(formValue.fechaStr).setUTCHours(12, 0, 0, 0)
        })),
        map(changes =>
            new eeppActions.DraftModified(changes)
        )
    )

    //CUANDO SE SELECCIONA CLIENTE  
    @Effect()
    mergeClienteSelection$: Observable<Action> = this.actions$.pipe(
        ofType<eeppActions.MergeClienteSelection>(
            eeppActions.ActionTypes.MergeClienteSelection
        ),
        flatMap(action => [
            new eeppActions.DraftModified({ cliente: action.payload }),
            new eeppActions.CloseClienteSelector(),
        ])
    )
    //ABRIR MODAL SELECCIONAR CLIENTE    
    @Effect()
    openClienteSelection$: Observable<Action> = this.actions$.pipe(
        ofType<eeppActions.OpenClienteSelector>(
            eeppActions.ActionTypes.OpenClienteSelector
        ),
        map(() => new UiStoreActions.ModalOpened('select-cliente'))
    )
    //CERRAR MODAL SELECCIONAR CLIENTE    
    @Effect()
    closeClienteSelection$: Observable<Action> = this.actions$.pipe(
        ofType<eeppActions.CloseClienteSelector>(
            eeppActions.ActionTypes.CloseClienteSelector
        ),
        map(() => new UiStoreActions.ModalClosed())
    )

    // VISTA PREVIA
    @Effect()
    showPreview$: Observable<Action> = this.actions$.pipe(
        ofType<eeppActions.ShowPreview>(
            eeppActions.ActionTypes.ShowPreview
        ),
        tap(_ => this.store$.dispatch(new eeppActions.MakingPdf())),
        withLatestFrom(this.epFacadeSrv.nuevoEstadoPago$),
        switchMap(([_, cot]) =>
            observableFrom(
                new Promise(resolve => {
                    this.pdfSrv.generar(cot.draft, true).getDataUrl(val => resolve(val))
                })
            ).pipe(
                flatMap(url => [
                    new eeppActions.PdfSuccessfullyMade(),
                    new UiStoreActions.OpenPdfView(url)
                ]),
                catchError(error => observableOf(new eeppActions.MakePdfFailed({ error: error })))
            ),
        ),
    )

    // GENERAR NUEVO ESTADO DE PAGO
    @Effect()
    generateDocument$: Observable<Action> = this.actions$.pipe(
        ofType<eeppActions.GenerateDocument>(
            eeppActions.ActionTypes.GenerateDocument
        ),
        withLatestFrom(this.epFacadeSrv.nuevoEstadoPago$),
        map(([_, nuevoEp]) => new eeppActions.CreateFirestoreDocument(nuevoEp.draft)),
    )

    // CREAR DOCUMENTO CON FOLIO EN FIRESTORE 
    @Effect()
    createFirestoreDocument$: Observable<Action> = this.actions$.pipe(
        ofType<eeppActions.CreateFirestoreDocument>(
            eeppActions.ActionTypes.CreateFirestoreDocument
        ),
        map(action => action.payload),
        tap(draft => this.store$.dispatch(new eeppActions.CreatingFirestoreDocument())),
        withLatestFrom(this.epFacadeSrv.lastFolio$),
        map(([draft, lastFolio]) => ({ ...draft, folio: lastFolio + 1 })),
        switchMap((newDocument: EstadoPago) => observableFrom(this.firestoreService.set('eepp',String(newDocument.folio),  newDocument).then(
            () => newDocument
        )).pipe(
            flatMap(newDocument => [
                new eeppActions.FirestoreDocumentSuccessfullyCreated(newDocument.folio),
                new eeppActions.MakePdf(newDocument),
                new LogsStoreActions.CreateRequest({
                    tipo: 'CREAR',
                    coleccion: 'eepp',
                    documento: String(newDocument.id)
                })
            ]),
            catchError(error => observableOf(new eeppActions.CreateFirestoreDocumentFailed({ error })))
        ))
    )

    // HACER PDF
    @Effect()
    makePdf$: Observable<Action> = this.actions$.pipe(
        ofType<eeppActions.MakePdf>(
            eeppActions.ActionTypes.MakePdf
        ),
        map(action => action.payload),
        tap(_ => this.store$.dispatch(new eeppActions.MakingPdf())),
        switchMap(newDocument =>
            observableFrom(
                new Promise(resolve => {
                    this.pdfSrv.generar(newDocument, false).getBlob(val => resolve(val))
                })
            ).pipe(
                // map(pdf => ([pdf, newDocument.folio])),
                flatMap(pdf => [
                    new eeppActions.PdfSuccessfullyMade(),
                    new eeppActions.UploadToStorage({ blob: pdf, folio: newDocument.folio }),
                ]),
                catchError(error => observableOf(new eeppActions.MakePdfFailed({ error: error })))
            ),
        ),
    )

    // SUBIR PDF A STORAGE
    @Effect()
    uploadToStorage$: Observable<Action> = this.actions$.pipe(
        ofType<eeppActions.UploadToStorage>(
            eeppActions.ActionTypes.UploadToStorage
        ),
        map(action => action.payload),
        tap(_ => this.store$.dispatch(new eeppActions.UploadingToStorage())),
        switchMap(payload =>
            observableFrom(this.storageSrv.put('eepp/EP' + payload.folio+'.pdf', payload.blob)
                .then((snapshot) => snapshot.ref.getDownloadURL())
                .then(url => ([url, payload.folio]))
            ).pipe(
                flatMap(([url, folio]) => [
                    new eeppActions.PdfSuccessfullyUploaded(url),
                    new eeppActions.UpdateFirestoreDocument({ folio, changes: { url: url } }),
                ]),
                catchError(error => observableOf(new eeppActions.UploadToStorageFailed({ error: error })))
            )),
    )
    //  ACTUALIZAR URL DEL EP EN FIRESTORE
    @Effect()
    updateFirestoreDocument$: Observable<Action> = this.actions$.pipe(
        ofType<eeppActions.UpdateFirestoreDocument>(
            eeppActions.ActionTypes.UpdateFirestoreDocument
        ),
        map(action => action.payload),
        tap(_ => this.store$.dispatch(new eeppActions.UpdatingFirestoreDocument())),
        switchMap(payload => observableFrom(this.firestoreService.set('eepp', String(payload.folio), payload.changes)).pipe(
            flatMap(url => [
                new eeppActions.FirestoreDocumentSuccessfullyUpdated(),
                new NavigationStoreActions.GoTo({ path: ['eepp'] })
            ]),
            catchError(error => observableOf(new eeppActions.UpdateFirestoreDocumentFailed({ error: error })))
        )),
    )


















    fromZero(): EstadoPago {
        return {
            divisa: 'CLP',
            detalle: [
                { descripcion: "Soldadores HDPE", cantidad: 1, unidad: "dias", precio_unitario: 1000, subtotal: 1000 },
                { descripcion: "Supervisor", cantidad: 1, unidad: "un", precio_unitario: 1000, subtotal: 1000 },
                { descripcion: "Prevencionista", cantidad: 1, unidad: "un", precio_unitario: 1000, subtotal: 1000 },
                { descripcion: "Movilización y desmovilización", cantidad: 1, unidad: "un", precio_unitario: 1000, subtotal: 1000 },
                { descripcion: "Alimentación", cantidad: 1, unidad: "un", precio_unitario: 1000, subtotal: 1000 },
                { descripcion: "Gastos generales", cantidad: 1, unidad: "gl", precio_unitario: 1000, subtotal: 1000 }
            ]
        }
    }

    clean(c): EstadoPago {
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