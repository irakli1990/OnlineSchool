import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Klasa } from 'app/shared/model/klasa.model';
import { KlasaService } from './klasa.service';
import { KlasaComponent } from './klasa.component';
import { KlasaDetailComponent } from './klasa-detail.component';
import { KlasaUpdateComponent } from './klasa-update.component';
import { KlasaDeletePopupComponent } from './klasa-delete-dialog.component';
import { IKlasa } from 'app/shared/model/klasa.model';

@Injectable({ providedIn: 'root' })
export class KlasaResolve implements Resolve<IKlasa> {
    constructor(private service: KlasaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IKlasa> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Klasa>) => response.ok),
                map((klasa: HttpResponse<Klasa>) => klasa.body)
            );
        }
        return of(new Klasa());
    }
}

export const klasaRoute: Routes = [
    {
        path: '',
        component: KlasaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onlineschoolApp.klasa.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: KlasaDetailComponent,
        resolve: {
            klasa: KlasaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onlineschoolApp.klasa.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: KlasaUpdateComponent,
        resolve: {
            klasa: KlasaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onlineschoolApp.klasa.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: KlasaUpdateComponent,
        resolve: {
            klasa: KlasaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onlineschoolApp.klasa.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const klasaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: KlasaDeletePopupComponent,
        resolve: {
            klasa: KlasaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onlineschoolApp.klasa.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
