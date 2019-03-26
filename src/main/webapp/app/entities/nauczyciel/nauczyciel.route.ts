import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Nauczyciel } from 'app/shared/model/nauczyciel.model';
import { NauczycielService } from './nauczyciel.service';
import { NauczycielComponent } from './nauczyciel.component';
import { NauczycielDetailComponent } from './nauczyciel-detail.component';
import { NauczycielUpdateComponent } from './nauczyciel-update.component';
import { NauczycielDeletePopupComponent } from './nauczyciel-delete-dialog.component';
import { INauczyciel } from 'app/shared/model/nauczyciel.model';

@Injectable({ providedIn: 'root' })
export class NauczycielResolve implements Resolve<INauczyciel> {
    constructor(private service: NauczycielService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INauczyciel> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Nauczyciel>) => response.ok),
                map((nauczyciel: HttpResponse<Nauczyciel>) => nauczyciel.body)
            );
        }
        return of(new Nauczyciel());
    }
}

export const nauczycielRoute: Routes = [
    {
        path: '',
        component: NauczycielComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onlineschoolApp.nauczyciel.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: NauczycielDetailComponent,
        resolve: {
            nauczyciel: NauczycielResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onlineschoolApp.nauczyciel.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: NauczycielUpdateComponent,
        resolve: {
            nauczyciel: NauczycielResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onlineschoolApp.nauczyciel.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: NauczycielUpdateComponent,
        resolve: {
            nauczyciel: NauczycielResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onlineschoolApp.nauczyciel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const nauczycielPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: NauczycielDeletePopupComponent,
        resolve: {
            nauczyciel: NauczycielResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'onlineschoolApp.nauczyciel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
