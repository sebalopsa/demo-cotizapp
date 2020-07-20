import { Component, OnInit, Input } from '@angular/core';
import { FotoTrabajadorService } from './foto-trabajador.service';
import { Router } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Trabajador } from '../../trabajadores.service';

@Component({
  selector: 'ficha-trabajador-header',
  templateUrl: './ficha-trabajador-header.component.html',
  styleUrls: ['./ficha-trabajador-header.component.css'],
  providers: [FotoTrabajadorService]
})
export class FichaTrabajadorHeaderComponent implements OnInit {

  @Input() trabajador: Trabajador
  defaultImg = '../../../../../../../../assets/img/worker-1.png'

  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;

  constructor(
    private srv: FotoTrabajadorService,
    private router: Router,
    private imageCompress: NgxImageCompressService
  ) { }

  ngOnInit() {

  }
  
  back() {
    this.router.navigateByUrl('/trabajadores');
  }

  compressFile() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      var img = new Image();
      var ratio = 50;
      img.onload = () => {
        ratio = 128 / img.width * 100
        console.log("Dimensiones iniciales: " + img.width + 'x' + img.height)
        console.log('El ratio debe ser: ' + ratio);
        comprimir(ratio).then(imgComprimida=> this.guardar(imgComprimida))
      };
      img.src = image;

      var comprimir = (ratio) => {
        console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

        return this.imageCompress.compressFile(image, orientation, ratio, 50).then(
          result => {
            var img = new Image();
            img.onload = () => {
              console.log("Dimensiones finales son: " + img.width + 'x' + img.height)
              console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
            };
            return result;
          }
        );
      }
    });
  }

  guardar(base64) {
    let archivo = this.dataURLtoFile(base64, this.trabajador.rut + '_' + 'foto')
    this.srv.subirFoto(this.trabajador, archivo)
  }


  dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}


}
