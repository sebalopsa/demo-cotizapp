import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of as observableOf, from as observableFrom } from 'rxjs';
import { catchError, map, flatMap, switchMap, withLatestFrom, filter, tap, takeWhile, first } from 'rxjs/operators';
import * as cotizacionesActions from './actions';
import { CotizacionesFacadeService } from './facade';
import { NavigationStoreActions } from '../navigation';
import { UiStoreActions } from '../ui';
import { RoccflexFacadeService } from '../roccflex/facade';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PdfCotizacionService } from 'src/app/services/pdf-cotizacion.service';
import { Cotizacion } from 'src/app/models';
import { StorageService } from 'src/app/services/storage.service';
import { LogsStoreActions } from '../logs';

@Injectable()
export class CotizacionesStoreEffects {
    constructor(
        private firestoreService: FirestoreService,
        private actions$: Actions,
        private cotFacadeSrv: CotizacionesFacadeService,
        private roccflexFacadeSrv: RoccflexFacadeService,
        private pdfSrv: PdfCotizacionService,
        private store$: Store<any>,
        private storageSrv: StorageService,
    ) { }

    //CARGAR ITEMS SI NO ESTAN CARGADOS
    @Effect()
    loadItems$: Observable<Action> = this.actions$.pipe(
        ofType<cotizacionesActions.LoadItems>(
            cotizacionesActions.ActionTypes.LoadItems
        ),
        withLatestFrom(this.cotFacadeSrv.hasLoaded$),
        map(([_, hasLoaded]) => hasLoaded ?
            new cotizacionesActions.ItemsLoaded() :
            new cotizacionesActions.LoadingItems()
        )
    )

    //CARGAR ITEMS DESDE FIRESTORE
    @Effect()
    loadFromFirestore$: Observable<Action> = this.actions$.pipe(
        ofType<cotizacionesActions.LoadingItems>(
            cotizacionesActions.ActionTypes.LoadingItems
        ),
        switchMap(_ => this.firestoreService.getItems('cotizaciones', true)),
        map(items => new cotizacionesActions.LoadSucceeded({ items })),
        catchError(error => observableOf(new cotizacionesActions.LoadFailed({ error })))
    )

    //CREAR NUEVA EN BLANCO
    @Effect()
    initializeBlankDraft$: Observable<Action> = this.actions$.pipe(
        ofType<cotizacionesActions.InitializeBlankDraft>(
            cotizacionesActions.ActionTypes.InitializeBlankDraft
        ),
        map(_ =>
            new cotizacionesActions.InitializingDraft(this.fromZero()),
        )
    )

    //CREAR NUEVA A PARTIR DE ANTERIOR
    @Effect()
    initializeDraftFromPrevious$: Observable<Action> = this.actions$.pipe(
        ofType<cotizacionesActions.InitializeDraftFromPrevious>(
            cotizacionesActions.ActionTypes.InitializeDraftFromPrevious
        ),
        map(action => action.payload),
        map(draft =>
            new cotizacionesActions.InitializingDraft(draft),
        )
    )

    //PREPARAR DOCUMENTO PARA EMPEZAR A EDITAR
    @Effect()
    initializeDraft$: Observable<Action> = this.actions$.pipe(
        ofType<cotizacionesActions.InitializingDraft>(
            cotizacionesActions.ActionTypes.InitializingDraft
        ),
        map(action => action.payload),
        map(draft => this.clean(draft)),
        withLatestFrom(this.roccflexFacadeSrv.empresas$),
        map(([draft, empresas]) => ({ ...draft, ...this.calcularTotales(draft), emisor: empresas['111111111'] })),
        flatMap(draft => [
            new cotizacionesActions.DraftInitialized(draft),
            new cotizacionesActions.OpenDraftEditor()
        ])
    )

    //ABRIR EDITOR NUEVA COTIZACION
    @Effect()
    openDraftEditor$: Observable<Action> = this.actions$.pipe(
        ofType<cotizacionesActions.OpenDraftEditor>(
            cotizacionesActions.ActionTypes.OpenDraftEditor
        ),
        flatMap(_ => [
            new NavigationStoreActions.GoTo({ path: ['', 'cotizaciones', 'nueva'] }),
            new UiStoreActions.SidebarCollapsed()
        ])
    )

    //CERRAR EDITOR DE NUEVA-COTIZACION
    @Effect()
    closeDraftEditor$: Observable<Action> = this.actions$.pipe(
        ofType<cotizacionesActions.CloseDraftEditor>(
            cotizacionesActions.ActionTypes.CloseDraftEditor
        ),
        map(_ => new cotizacionesActions.DraftCleaned())
    )

    //CUANDO HAY CAMBIOS EN FORMULARIO DE NUEVA COTIZACION   
    @Effect()
    mergeFormChanges$: Observable<Action> = this.actions$.pipe(
        ofType<cotizacionesActions.MergeFormChanges>(
            cotizacionesActions.ActionTypes.MergeFormChanges
        ),
        map(actions => actions.payload),
        map(formValue => ({
            ...formValue,
            ...this.calcularTotales(formValue),
            fecha: new Date(formValue.fechaStr).setUTCHours(12, 0, 0, 0)
        })),
        map(changes =>
            new cotizacionesActions.DraftModified(changes)
        )
    )

    //CUANDO SE SELECCIONA CLIENTE  
    @Effect()
    mergeClienteSelection$: Observable<Action> = this.actions$.pipe(
        ofType<cotizacionesActions.MergeClienteSelection>(
            cotizacionesActions.ActionTypes.MergeClienteSelection
        ),
        flatMap(action => [
            new cotizacionesActions.DraftModified({ cliente: action.payload }),
            new cotizacionesActions.CloseClienteSelector(),
        ])
    )
    //ABRIR MODAL SELECCIONAR CLIENTE    
    @Effect()
    openClienteSelection$: Observable<Action> = this.actions$.pipe(
        ofType<cotizacionesActions.OpenClienteSelector>(
            cotizacionesActions.ActionTypes.OpenClienteSelector
        ),
        map(() => new UiStoreActions.ModalOpened('select-cliente'))
    )
    //CERRAR MODAL SELECCIONAR CLIENTE    
    @Effect()
    closeClienteSelection$: Observable<Action> = this.actions$.pipe(
        ofType<cotizacionesActions.CloseClienteSelector>(
            cotizacionesActions.ActionTypes.CloseClienteSelector
        ),
        map(() => new UiStoreActions.ModalClosed())
    )

    // VISTA PREVIA
    @Effect()
    showPreview$: Observable<Action> = this.actions$.pipe(
        ofType<cotizacionesActions.ShowPreview>(
            cotizacionesActions.ActionTypes.ShowPreview
        ),
        tap(_ => this.store$.dispatch(new cotizacionesActions.MakingPdf())),
        withLatestFrom(this.cotFacadeSrv.nuevaCotizacion$),
        switchMap(([_, cot]) =>
            observableFrom(
                new Promise(resolve => {
                    this.pdfSrv.generar(cot.draft, true).getDataUrl(val => resolve(val))
                })
            ).pipe(
                flatMap(url => [
                    new cotizacionesActions.PdfSuccessfullyMade(),
                    new UiStoreActions.OpenPdfView(url)
                ]),
                catchError(error => observableOf(new cotizacionesActions.MakePdfFailed({ error: error })))
            ),
        ),
    )

    // GENERAR NUEVA COTIZACION
    @Effect()
    generateDocument$: Observable<Action> = this.actions$.pipe(
        ofType<cotizacionesActions.GenerateDocument>(
            cotizacionesActions.ActionTypes.GenerateDocument
        ),
        withLatestFrom(this.cotFacadeSrv.nuevaCotizacion$),
        map(([_, nuevaCotizacion]) => new cotizacionesActions.CreateFirestoreDocument(nuevaCotizacion.draft)),
    )

    // CREAR DOCUMENTO CON FOLIO EN FIRESTORE 
    @Effect()
    createFirestoreDocument$: Observable<Action> = this.actions$.pipe(
        ofType<cotizacionesActions.CreateFirestoreDocument>(
            cotizacionesActions.ActionTypes.CreateFirestoreDocument
        ),
        map(action => action.payload),
        tap(draft => this.store$.dispatch(new cotizacionesActions.CreatingFirestoreDocument())),
        withLatestFrom(this.cotFacadeSrv.lastFolio$),
        map(([draft, lastFolio]) => ({ ...draft, folio: lastFolio + 1 })),
        switchMap((newDocument: Cotizacion) => observableFrom(this.firestoreService.set('cotizaciones', String(newDocument.folio), newDocument).then(
            () => newDocument
        )).pipe(
            flatMap(newDocument => [
                new cotizacionesActions.FirestoreDocumentSuccessfullyCreated(newDocument.folio),
                new cotizacionesActions.MakePdf(newDocument),
                new LogsStoreActions.CreateRequest({
                    tipo: 'CREAR',
                    coleccion: 'cotizaciones',
                    documento: String(newDocument.id)
                })
            ]),
            catchError(error => observableOf(new cotizacionesActions.CreateFirestoreDocumentFailed({ error })))
        ))
    )

    // HACER PDF
    @Effect()
    makePdf$: Observable<Action> = this.actions$.pipe(
        ofType<cotizacionesActions.MakePdf>(
            cotizacionesActions.ActionTypes.MakePdf
        ),
        map(action => action.payload),
        tap(_ => this.store$.dispatch(new cotizacionesActions.MakingPdf())),
        switchMap(newDocument =>
            observableFrom(
                new Promise(resolve => {
                    this.pdfSrv.generar(newDocument, false).getBlob(val => resolve(val))
                })
            ).pipe(
                // map(pdf => ([pdf, newDocument.folio])),
                flatMap(pdf => [
                    new cotizacionesActions.PdfSuccessfullyMade(),
                    new cotizacionesActions.UploadToStorage({ blob: pdf, folio: newDocument.folio }),
                ]),
                catchError(error => observableOf(new cotizacionesActions.MakePdfFailed({ error: error })))
            ),
        ),
    )

    // SUBIR PDF A STORAGE
    @Effect()
    uploadToStorage$: Observable<Action> = this.actions$.pipe(
        ofType<cotizacionesActions.UploadToStorage>(
            cotizacionesActions.ActionTypes.UploadToStorage
        ),
        map(action => action.payload),
        tap(_ => this.store$.dispatch(new cotizacionesActions.UploadingToStorage())),
        switchMap(payload =>
            observableFrom(this.storageSrv.put('cotizaciones/COT' + payload.folio + '.pdf', payload.blob)
                .then((snapshot) => snapshot.ref.getDownloadURL())
                .then(url => ([url, payload.folio]))
            ).pipe(
                flatMap(([url, folio]) => [
                    new cotizacionesActions.PdfSuccessfullyUploaded(url),
                    new cotizacionesActions.UpdateFirestoreDocument({ folio, changes: { url: url } }),
                ]),
                catchError(error => observableOf(new cotizacionesActions.UploadToStorageFailed({ error: error })))
            )
        ),
    )
    //  ACTUALIZAR URL DE LA COTIZACION EN FIRESTORE
    @Effect()
    updateFirestoreDocument$: Observable<Action> = this.actions$.pipe(
        ofType<cotizacionesActions.UpdateFirestoreDocument>(
            cotizacionesActions.ActionTypes.UpdateFirestoreDocument
        ),
        map(action => action.payload),
        tap(_ => this.store$.dispatch(new cotizacionesActions.UpdatingFirestoreDocument())),
        switchMap(payload => observableFrom(this.firestoreService.set('cotizaciones', String(payload.folio), payload.changes)).pipe(
            flatMap(url => [
                new cotizacionesActions.FirestoreDocumentSuccessfullyUpdated(),
                new NavigationStoreActions.GoTo({ path: ['cotizaciones'] })
            ]),
            catchError(error => observableOf(new cotizacionesActions.UpdateFirestoreDocumentFailed({ error: error })))
        )),
    )



    // HACER PDF Y MOSTRAR
    @Effect()
    makePdfAndShow$: Observable<Action> = this.actions$.pipe(
        ofType<cotizacionesActions.makePdfAndShow>(
            cotizacionesActions.ActionTypes.makePdfAndShow
        ),
        map(action => action.payload),
        tap(_ => this.store$.dispatch(new cotizacionesActions.MakingPdf())),
        switchMap(cot =>
            observableFrom(
                new Promise(resolve => {
                    this.pdfSrv.generar(cot, false).getDataUrl(val => resolve(val))
                })
            ).pipe(
                flatMap(url => [
                    new cotizacionesActions.PdfSuccessfullyMade(),
                    new UiStoreActions.OpenPdfView(url)
                ]),
                catchError(error => observableOf(new cotizacionesActions.MakePdfFailed({ error: error })))
            ),
        ),
    )




















    fromZero(): Cotizacion {
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

    clean(c): Cotizacion {
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