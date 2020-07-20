import { Injectable } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { RutDirective, RutPipe, Ng2Rut } from 'ng2-rut';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
    providedIn: 'root'
})
export class PdfCotizacionService {

    constructor(private rutPipe: RutPipe, private decimalPipe: DecimalPipe, private datePipe: DatePipe) { }

    generar(cotizacion, preview: boolean) {
        var fecha = new Date(cotizacion.fecha);
        var watermark = preview ? { text: 'vista previa', color: 'blue', opacity: 0.2, bold: true, italics: false } : null;

        var docDefinition = {
            pageSize: 'LETTER',
            pageMargins: [70, 40, 70, 40],
            watermark: watermark,

            pages: function (currentPage, pageCount) {
                return 'Página' + currentPage.toString() + ' de ' + pageCount;
            },

            content: [
                {
                    columns: [
                        {
                            width: '70%',
                            table: {
                                widths: ['40%', 'auto', '*'],
                                body: [
                                    [{
                                        border: [true, true, false, false],
                                        image: 'img',
                                        width: 85,
                                        height: 50,
                                        alignment: 'center',
                                        rowSpan: 5
                                    }, {
                                        text: 'Mi Empresa',
                                        style: 'emisorTitle',
                                        colSpan: 2,
                                        border: [false, true, true, false]
                                    },
                                    {}
                                    ],

                                    [{},
                                    { text: 'Rut', style: 'emisorField', border: [false, false, false, false] },
                                    { text: ': ' + this.rutPipe.transform(cotizacion.emisor.rut), style: 'emisorData', border: [false, false, true, false] }

                                    ],

                                    [{},
                                    { text: 'Dirección', style: 'emisorField', border: [false, false, false, false] },
                                    { text: ': ' + cotizacion.emisor.direccion, style: 'emisorData', border: [false, false, true, false] }
                                    ],

                                    [{}, { text: 'Teléfono', style: 'emisorField', border: [false, false, false, false] },
                                    { text: ': ' + cotizacion.emisor.telefono, style: 'emisorData', border: [false, false, true, false] }
                                    ],

                                    [{},
                                    { text: 'Correo', style: 'emisorField', border: [false, false, false, true] },
                                    { text: ': ' + cotizacion.emisor.email, style: 'emisorData', border: [false, false, true, true] }
                                    ]
                                ]
                            }
                        },
                        {
                            stack: [
                                {
                                    text: [
                                        {
                                            text: 'COTIZACIÓN\n\n',
                                            bold: true,
                                            alignment: 'center',
                                            fontSize: 14
                                        },
                                        {
                                            text: 'Fecha de emisión: ' + this.datePipe.transform(cotizacion.fecha, 'dd/MM/yyyy') + '\n\n',
                                        },
                                        {
                                            text: 'Cotización N°: ' + (preview ? 'por definir' : cotizacion.folio),
                                            bold: true,
                                            fontSize: 11
                                        }
                                    ],

                                }
                            ],
                            style: 'top',
                        }
                    ],
                    columnGap: 15
                },
                {
                    margin: [0, 10, 0, 0],
                    table: {
                        widths: ['50%', '50%'],
                        body: [
                            [
                                {
                                    border: [false, true, false, true],
                                    table: {
                                        body: [
                                            [{ border: [false, false, false, false], text: 'Cliente:', style: 'field' }, { border: [false, false, false, false], text: cotizacion.cliente.nombre, style: 'data' }],
                                            [{ border: [false, false, false, false], text: 'Rut:', style: 'field' }, { border: [false, false, false, false], text: this.rutPipe.transform(cotizacion.cliente.rut), style: 'data' }],
                                            [{ border: [false, false, false, false], text: 'Dirección:', style: 'field' }, { border: [false, false, false, false], text: cotizacion.cliente.direccion, style: 'data' }],
                                        ]
                                    }

                                },
                                {
                                    border: [false, true, false, true],
                                    table: {
                                        body: [
                                            [{ border: [false, false, false, false], text: 'Teléfono:', style: 'field' }, { border: [false, false, false, false], text: cotizacion.cliente.telefono, style: 'data' }],
                                            [{ border: [false, false, false, false], text: 'Correo:', style: 'field' }, { border: [false, false, false, false], text: cotizacion.cliente.email, style: 'data' }],
                                        ]
                                    }
                                },
                            ],
                        ]
                    }
                },
                {
                    margin: [0, 0, 0, 10],
                    table: {
                        widths: ['35%', '35%', '*'],
                        body: [
                            [
                                {
                                    colSpan: 3,
                                    border: [false, false, false, false],
                                    table: {
                                        body: [
                                            [{ border: [false, false, false, false], text: 'Servicio prestado:', style: 'field' }, { border: [false, false, false, false], text: cotizacion.servicio ? cotizacion.servicio : '', style: 'data' }]
                                        ]
                                    }
                                },
                                {},
                                {}
                            ],
                            [
                                {
                                    border: [false, false, false, false],
                                    table: {
                                        body: [
                                            [{ border: [false, false, false, false], text: 'Plazo de entrega:', style: 'field' }, { border: [false, false, false, false], text: cotizacion.plazo ? (cotizacion.plazo + ' días') : '', style: 'data' }],]
                                    }

                                },
                                {
                                    border: [false, false, false, false],
                                    table: {
                                        body: [
                                            [{ border: [false, false, false, false], text: 'Vencimiento:', style: 'field' }, { border: [false, false, false, false], text: cotizacion.vigencia ? (cotizacion.vigencia + ' días') : '', style: 'data' }],
                                        ]
                                    }
                                },
                                {
                                    border: [false, false, false, false],
                                    table: {
                                        body: [
                                            [{ border: [false, false, false, false], text: 'Divisa:', style: 'field' }, { border: [false, false, false, false], text: cotizacion.divisa, style: 'data' }]
                                        ]
                                    }
                                }
                            ]
                        ]
                    }
                },
                {
                    style: 'tableDetail',
                    table: {
                        // headerRows: 1,
                        widths: ['40%', '15%', '15%', '15%', '15%'],
                        body: this.construirTablaDetalle(cotizacion.detalle, cotizacion.divisa)
                    },
                    layout: 'noBorders'
                },
                {
                    table: {
                        widths: ['60%', '40%'],
                        body: [
                            [{
                                border: [false, true, false, false],
                                table: {
                                    // headerRows: 1,
                                    widths: ['100%'],
                                    body: [[{ border: [false, false, false, false], text: '' }], [{ text: cotizacion.notas ? cotizacion.notas : '', style: 'notas' }]]
                                },
                            },
                            {
                                border: [false, true, false, false],
                                table: {
                                    // headerRows: 1,
                                    widths: ['40%', '60%'],
                                    body: [
                                        [
                                            {
                                                text: (cotizacion.montoUtilidad > 0) ? 'Subtotal:\n Utilidad (' + cotizacion.porcentajeUtilidad + ' %):\n' : '',
                                                style: 'totales'
                                            },
                                            { text: (cotizacion.montoUtilidad > 0) ? '$ ' + this.decimalPipe.transform(cotizacion.subtotal, cotizacion.divisa == 'CLP' ? '1.0-0' : '1.0-2') + '\n' + '$ ' + this.decimalPipe.transform(cotizacion.montoUtilidad, cotizacion.divisa == 'CLP' ? '1.0-0' : '1.0-2') + '\n' : '', style: 'totales' }
                                        ],
                                        [
                                            { text: 'Total neto:\n IVA:\n', style: 'totales' },
                                            { text: '$ ' + this.decimalPipe.transform(cotizacion.totalNeto, cotizacion.divisa == 'CLP' ? '1.0-0' : '1.0-2') + '\n' + '$ ' + this.decimalPipe.transform(cotizacion.iva, cotizacion.divisa == 'CLP' ? '1.0-0' : '1.0-2') + '\n', style: 'totales' }
                                        ],
                                        [
                                            {
                                                text: 'Total:',
                                                bold: true,
                                                style: 'total'
                                            },
                                            {
                                                text: '$ ' + this.decimalPipe.transform(cotizacion.total, cotizacion.divisa == 'CLP' ? '1.0-0' : '1.0-2'),
                                                bold: true,
                                                style: 'total'
                                            }
                                        ]
                                    ]
                                },
                                layout: 'noBorders'
                            }]
                        ],
                    },
                    // layout: 'noBorders'
                },

            ],

            styles: {
                imageFooter1: {
                    fontSize: 9,
                    alignment: 'center'
                },
                imageFooter2: {
                    fontSize: 7,
                    alignment: 'center'
                },
                emisorTitle: {
                    fontSize: 11,
                    bold: true,
                    alignment: 'center'
                },
                emisorField: {
                    fontSize: 9,
                    bold: true
                },
                emisorData: {
                    fontSize: 9,
                },
                field: {
                    fontSize: 10,
                    bold: true
                },
                data: {
                    fontSize: 10,
                },
                title: {
                    fontSize: 22,
                    bold: true,
                },
                top: {
                    fontSize: 9,
                    alignment: 'left',
                    margin: [0, 5]
                },
                notas: {
                    fontSize: 10,
                    margin: [0, 5, 0, 5]
                },
                svc: {
                    fontSize: 10,
                    margin: [0, 0, 0, 12]
                },
                detail: {
                    fontSize: 15,
                    bold: true,
                    margin: [0, 2]
                },
                totales: {
                    fontSize: 10,
                    alignment: 'right',
                    margin: [0, 2]
                },
                total: {
                    fontSize: 11,
                    alignment: 'right',
                    margin: [0, 2]
                },
                tableDetail: {
                    margin: [0, 5]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 10,
                    color: 'white',
                    fillColor: '#006599',
                    alignment: 'center',
                    border: [false, false, false, false]
                },
                tableContent: {
                    fontSize: 10,
                    margin: [0, 2],
                },
                tableContentShort: {
                    fontSize: 10,
                    margin: [0, 2],
                    alignment: 'center'
                },
                tableContent$: {
                    fontSize: 10,
                    margin: [0, 2],
                    alignment: 'right'
                },
            },
            images: {
                img: 'data:image/png;base64,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',
            }
        }
        // var docDefinition = {
        //     content: [{
        //         text: 'My name is: PDF '
        //     }]
        // }
        const pdfDoc = pdfMake.createPdf(docDefinition)
        return pdfDoc
    }


    construirTablaDetalle(detalle, divisa) {
        var body = [];

        body.push([
            {
                text: 'Detalle',
                style: 'tableHeader'
            },
            {
                text: 'Unidad',
                style: 'tableHeader'
            },
            {
                text: 'Cantidad',
                style: 'tableHeader'
            },
            {
                text: 'P. Unitario',
                style: 'tableHeader'
            },
            {
                text: 'Total',
                style: 'tableHeader'
            }
        ]);

        detalle.forEach(c => {
            body.push([

                {
                    text: c.descripcion,
                    style: 'tableContent'
                }
                ,
                {
                    text: c.unidad,
                    style: 'tableContentShort'
                },
                {
                    text: this.decimalPipe.transform(c.cantidad, '1.0-2'),
                    style: 'tableContentShort'
                },
                {
                    text: '$ ' + this.decimalPipe.transform(c.precio_unitario, '1.0-2'),
                    style: 'tableContent$'
                },
                {
                    text: '$ ' + this.decimalPipe.transform(c.subtotal, divisa == 'CLP' ? '1.0-0' : '1.0-2'),
                    style: 'tableContent$'
                }
            ]);
        });

        return body;
    }

}