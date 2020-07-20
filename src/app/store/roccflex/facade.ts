import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as state from './state';
import * as selectors from './selectors';
import * as actions from './actions';


@Injectable({
    providedIn: 'root'
})
export class RoccflexFacadeService {

    empresas$: Observable<any>;

    constructor(private store$: Store<state.State>) {
        this.empresas$ = this.store$.select(
            selectors.selectEmpresas
        );
    }
}
