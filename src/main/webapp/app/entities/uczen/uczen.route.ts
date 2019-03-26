import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Uczen } from 'app/shared/model/uczen.model';
import { UczenService } from './uczen.service';
import { UczenComponent } from './uczen.component';
import { UczenDetailComponent } from './uczen-detail.component';
import { UczenUpdateComponent } from './uczen-update.component';
import { UczenDeletePopupComponent } from './uczen-delete-dialog.component';
import { IUczen } from 'app/shared/model/uczen.model';

@Injectable({ providedIn: 'root' })
export class UczenResolve implements Resolve<IUczen> {
    constructor(private service: UczenService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUczen> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Uczen>) => response.ok),
                map((uczen: HttpResponse<Uczen>) => uczen.body)
            );
        }
        return of(new Uczen());
    }
}

export const uczenRoute: Routes = [
    {
        path: '',
        component: UczenComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onlineschoolApp.uczen.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: UczenDetailComponent,
        resolve: {
            uczen: UczenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onlineschoolApp.uczen.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: UczenUpdateComponent,
        resolve: {
            uczen: UczenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onlineschoolApp.uczen.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: UczenUpdateComponent,
        resolve: {
            uczen: UczenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onlineschoolApp.uczen.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const uczenPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: UczenDeletePopupComponent,
        resolve: {
            uczen: UczenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onlineschoolApp.uczen.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
