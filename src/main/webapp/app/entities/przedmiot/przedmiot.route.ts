import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Przedmiot } from 'app/shared/model/przedmiot.model';
import { PrzedmiotService } from './przedmiot.service';
import { PrzedmiotComponent } from './przedmiot.component';
import { PrzedmiotDetailComponent } from './przedmiot-detail.component';
import { PrzedmiotUpdateComponent } from './przedmiot-update.component';
import { PrzedmiotDeletePopupComponent } from './przedmiot-delete-dialog.component';
import { IPrzedmiot } from 'app/shared/model/przedmiot.model';

@Injectable({ providedIn: 'root' })
export class PrzedmiotResolve implements Resolve<IPrzedmiot> {
    constructor(private service: PrzedmiotService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPrzedmiot> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Przedmiot>) => response.ok),
                map((przedmiot: HttpResponse<Przedmiot>) => przedmiot.body)
            );
        }
        return of(new Przedmiot());
    }
}

export const przedmiotRoute: Routes = [
    {
        path: '',
        component: PrzedmiotComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onlineschoolApp.przedmiot.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PrzedmiotDetailComponent,
        resolve: {
            przedmiot: PrzedmiotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onlineschoolApp.przedmiot.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PrzedmiotUpdateComponent,
        resolve: {
            przedmiot: PrzedmiotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onlineschoolApp.przedmiot.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PrzedmiotUpdateComponent,
        resolve: {
            przedmiot: PrzedmiotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onlineschoolApp.przedmiot.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const przedmiotPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PrzedmiotDeletePopupComponent,
        resolve: {
            przedmiot: PrzedmiotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onlineschoolApp.przedmiot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
