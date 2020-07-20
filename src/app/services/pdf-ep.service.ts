import { Injectable } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { RutDirective, RutPipe, Ng2Rut } from 'ng2-rut';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
    providedIn: 'root'
})
export class PdfEpService {

    constructor(private rutPipe: RutPipe, private decimalPipe: DecimalPipe, private datePipe: DatePipe) { }

    generar(document, preview: boolean) {
        var fecha = new Date(document.fecha);
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
                                        rowSpan: 3
                                    }, {
                                        text: 'ROCCFLEX LTDA',
                                        style: 'emisorTitle',
                                        colSpan: 2,
                                        border: [false, true, true, false]
                                    },
                                    {}
                                    ],

                                    [{},
                                    { text: 'Rut', style: 'emisorField', border: [false, false, false, false] },
                                    { text: ': ' + this.rutPipe.transform(document.emisor.rut), style: 'emisorData', border: [false, false, true, false] }

                                    ],

                                    [{},
                                    { text: 'Dirección', style: 'emisorField', border: [false, false, false, false] },
                                    { text: ': ' + document.emisor.direccion, style: 'emisorData', border: [false, false, true, false] }
                                    ],

                                    [{
                                        border: [true, false, false, true],
                                        text: [{ text: 'Soluciones integrales\n', style: 'imageFooter1' },
                                        { text: 'Geomembrana - Termofusión - HDPE', style: 'imageFooter2' }
                                        ],
                                        rowSpan: 2
                                    }, { text: 'Teléfono', style: 'emisorField', border: [false, false, false, false] },
                                    { text: ': ' + document.emisor.telefono, style: 'emisorData', border: [false, false, true, false] }
                                    ],

                                    [{},
                                    { text: 'Correo', style: 'emisorField', border: [false, false, false, true] },
                                    { text: ': ' + document.emisor.email, style: 'emisorData', border: [false, false, true, true] }
                                    ]
                                ]
                            }
                        },
                        {
                            stack: [
                                {
                                    text: [
                                        {
                                            text: 'ESTADO DE PAGO\n\n',
                                            bold: true,
                                            alignment: 'center',
                                            fontSize: 14
                                        },
                                        {
                                            text: 'Fecha de emisión: ' + this.datePipe.transform(document.fecha, 'dd/MM/yyyy') + '\n\n',
                                        },
                                        {
                                            text: 'Estado de Pago N°: ' + (preview ? 'por definir' : document.folio),
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
                                            [{ border: [false, false, false, false], text: 'Cliente:', style: 'field' }, { border: [false, false, false, false], text: document.cliente.nombre, style: 'data' }],
                                            [{ border: [false, false, false, false], text: 'Rut:', style: 'field' }, { border: [false, false, false, false], text: this.rutPipe.transform(document.cliente.rut), style: 'data' }],
                                            [{ border: [false, false, false, false], text: 'Dirección:', style: 'field' }, { border: [false, false, false, false], text: document.cliente.direccion, style: 'data' }],
                                        ]
                                    }

                                },
                                {
                                    border: [false, true, false, true],
                                    table: {
                                        body: [
                                            [{ border: [false, false, false, false], text: 'Teléfono:', style: 'field' }, { border: [false, false, false, false], text: document.cliente.telefono, style: 'data' }],
                                            [{ border: [false, false, false, false], text: 'Correo:', style: 'field' }, { border: [false, false, false, false], text: document.cliente.email, style: 'data' }],
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
                                            [{ border: [false, false, false, false], text: 'Servicio prestado:', style: 'field' }, { border: [false, false, false, false], text: document.servicio ? document.servicio : '', style: 'data' }]
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
                                            [{ border: [false, false, false, false], text: 'Plazo de entrega:', style: 'field' }, { border: [false, false, false, false], text: document.plazo ? (document.plazo + ' días') : '', style: 'data' }],]
                                    }

                                },
                                {
                                    border: [false, false, false, false],
                                    table: {
                                        body: [
                                            [{ border: [false, false, false, false], text: 'Vencimiento:', style: 'field' }, { border: [false, false, false, false], text: document.vigencia ? (document.vigencia + ' días') : '', style: 'data' }],
                                        ]
                                    }
                                },
                                {
                                    border: [false, false, false, false],
                                    table: {
                                        body: [
                                            [{ border: [false, false, false, false], text: 'Divisa:', style: 'field' }, { border: [false, false, false, false], text: document.divisa, style: 'data' }]
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
                        body: this.construirTablaDetalle(document.detalle, document.divisa)
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
                                    body: [[{ border: [false, false, false, false], text: '' }], [{ text: document.notas ? document.notas : '', style: 'notas' }]]
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
                                                text: (document.montoUtilidad > 0) ? 'Subtotal:\n Utilidad (' + document.porcentajeUtilidad + ' %):\n' : '',
                                                style: 'totales'
                                            },
                                            { text: (document.montoUtilidad > 0) ? '$ ' + this.decimalPipe.transform(document.subtotal, document.divisa == 'CLP' ? '1.0-0' : '1.0-2') + '\n' + '$ ' + this.decimalPipe.transform(document.montoUtilidad, document.divisa == 'CLP' ? '1.0-0' : '1.0-2') + '\n' : '', style: 'totales' }
                                        ],
                                        [
                                            { text: 'Total neto:\n IVA:\n', style: 'totales' },
                                            { text: '$ ' + this.decimalPipe.transform(document.totalNeto, document.divisa == 'CLP' ? '1.0-0' : '1.0-2') + '\n' + '$ ' + this.decimalPipe.transform(document.iva, document.divisa == 'CLP' ? '1.0-0' : '1.0-2') + '\n', style: 'totales' }
                                        ],
                                        [
                                            {
                                                text: 'Total:',
                                                bold: true,
                                                style: 'total'
                                            },
                                            {
                                                text: '$ ' + this.decimalPipe.transform(document.total, document.divisa == 'CLP' ? '1.0-0' : '1.0-2'),
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
                img: 'data:image/jpeg;base64,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',
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