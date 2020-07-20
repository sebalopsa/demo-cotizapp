import { Injectable } from '@angular/core';
import { InstalacionesService, Instalacion } from '../instalaciones.service';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import informacion_tecnica from 'src/assets/files/informacion_tecnica.json'

@Injectable()
export class CardService {

  constructor(
    private instalacionesSrv: InstalacionesService
  ) { }

  getAvance(proyectoId) {
    return this.instalacionesSrv.getItemsByProyecto(proyectoId).pipe(
      map(items => {
        return this.getAvancePorMaterial(items)
      })
    )
  }

  getAvancePorMaterial(items: Instalacion[]) {
    if (items) {
      const getSum = (mat) => items.filter(e => e.material === mat).map(e => e.cantidad).reduce((a, b) => a + b, 0);
      const getUnidad = (mat) => _.find(informacion_tecnica, { 'nombre': mat }).unidad
      const object = (mat) => ({ total: getSum(mat), unidad: getUnidad(mat) })
      return {
        termofusion: object('termofusion'),
        geotextil: object('geotextil'),
        hdpe: object('hdpe'),
        lldpe: object('lldpe')
      }
    }
    else return null
  }
}

export interface Avance {
  termofusion: number;
  geotextil: number;
  hdpe: number;
  lldpe: number;
}

