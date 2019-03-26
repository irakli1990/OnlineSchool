import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Ocena } from 'app/shared/model/ocena.model';
import { OcenaService } from './ocena.service';
import { OcenaComponent } from './ocena.component';
import { OcenaDetailComponent } from './ocena-detail.component';
import { OcenaUpdateComponent } from './ocena-update.component';
import { OcenaDeletePopupComponent } from './ocena-delete-dialog.component';
import { IOcena } from 'app/shared/model/ocena.model';

@Injectable({ providedIn: 'root' })
export class OcenaResolve implements Resolve<IOcena> {
    constructor(private service: OcenaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOcena> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Ocena>) => response.ok),
                map((ocena: HttpResponse<Ocena>) => ocena.body)
            );
        }
        return of(new Ocena());
    }
}

export const ocenaRoute: Routes = [
    {
        path: '',
        component: OcenaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onlineschoolApp.ocena.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: OcenaDetailComponent,
        resolve: {
            ocena: OcenaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onlineschoolApp.ocena.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: OcenaUpdateComponent,
        resolve: {
            ocena: OcenaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onlineschoolApp.ocena.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: OcenaUpdateComponent,
        resolve: {
            ocena: OcenaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onlineschoolApp.ocena.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ocenaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: OcenaDeletePopupComponent,
        resolve: {
            ocena: OcenaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onlineschoolApp.ocena.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
