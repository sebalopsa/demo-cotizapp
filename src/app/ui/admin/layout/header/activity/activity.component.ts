import { Component, OnInit } from '@angular/core';
import { LogsFacadeService } from 'src/app/store/logs/facade';
import { Log } from 'src/app/models';

@Component({
  selector: 'ui-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  hasLoaded: boolean;
  logs: Log[];

  constructor(public logsFacade: LogsFacadeService) { }

  ngOnInit() {
    this.logsFacade.logs$.subscribe(items => this.logs = items.slice(0, 4))
    this.logsFacade.hasLoaded$.subscribe(val => this.hasLoaded = val)
    if (!this.hasLoaded)
      this.logsFacade.load()
  }

  texto(log) {
    let texto;
    if (log.coleccion == 'oocc')
      switch (log.tipo) {
        case 'CREAR':
          texto = 'creó una nueva orden de compra.'
          break;
        case 'MODIFICAR':
          texto = 'cambió el estado de una orden de compra.'
          break;
        case 'ELIMINAR':
          texto = 'eliminó un presupuesto'
          break;
        default:
          break;
      }
    else if (log.coleccion == 'eepp')
      switch (log.tipo) {
        case 'CREAR':
          texto = 'creó un nuevo estado de pago.'
          break;
        case 'MODIFICAR':
          texto = 'cambió el estado de un estado de pago.'
          break;
        case 'ELIMINAR':
          texto = 'eliminó una cotización' // a pesar de que esto no puede ocurrir.
          break;
        default:
          break;
      }
    else if (log.coleccion == 'cotizaciones')
      switch (log.tipo) {
        case 'CREAR':
          texto = 'creó una nueva cotización.'
          break;
        case 'MODIFICAR':
          texto = 'cambió el estado de una cotización.'
          break;
        case 'ELIMINAR':
          texto = 'eliminó una cotización' // a pesar de que esto no puede ocurrir.
          break;
        default:
          break;
      }
    else if (log.coleccion == 'trabajadores')
      switch (log.tipo) {
        case 'CREAR':
          texto = 'agregó un nuevo trabajador.'
          break;
        case 'MODIFICAR':
          texto = 'modificó la información de un trabajador.'
          break;
        case 'ELIMINAR':
          texto = 'quitó un trabajador' // a pesar de que esto no puede ocurrir.
          break;
        default:
          break;
      }
    else if (log.coleccion == 'nominas')
      switch (log.tipo) {
        case 'CREAR':
          texto = 'agregó una nueva nómina.'
          break;
        default:
          break;
      }
    return texto
  }

  icon(log) {
    let icon;
    switch (log.coleccion) {
      case 'cotizaciones':
        icon = 'si si-docs'
        break;
      case 'oocc':
        icon = 'si si-basket'
        break;
      case 'eepp':
        icon = 'si si-wallet'
        break;
      case 'trabajadores':
        icon = 'si si-users'
        break;
      case 'nominas':
        icon = 'fa fa-table'
        break;
      default:
        break;
    }
    return icon
  }

  color(log) {
    let color;
    switch (log.tipo) {
      case 'CREAR':
        color = 'success'
        break;
      case 'MODIFICAR':
        color = 'secondary'
        break;
      case 'ELIMINAR':
        color = 'pulse'
        break;
      default:
        break;
    }
    return color
  }

}
