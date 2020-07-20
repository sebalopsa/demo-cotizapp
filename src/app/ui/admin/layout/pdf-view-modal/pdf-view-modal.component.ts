import { Component, OnInit } from '@angular/core';
import { UiFacadeService } from 'src/app/store/ui/facade';

@Component({
  selector: 'pdf-view-modal',
  templateUrl: './pdf-view-modal.component.html',
  styleUrls: ['./pdf-view-modal.component.css']
})
export class PdfViewModalComponent implements OnInit {
  opened: boolean;
  // loading$: Observable<boolean>;
  pdfSrc;

  constructor(private uiFacadeSrv: UiFacadeService) {
  }
  ngOnInit() {
    this.uiFacadeSrv.modal$.subscribe(m => this.opened = m == 'pdf-view')
    // this.loading$ = this.cotacadeSrv.loading$;
    this.uiFacadeSrv.pdfSource$.subscribe(val => this.pdfSrc = val)
  }

  cerrar() {
    this.uiFacadeSrv.closePdfView()
  }

  download() {
    // window.open(this.pdfSrc, 'download')
    this.downloadURI(this.pdfSrc, 'cotizacion')
  }

  downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


}
