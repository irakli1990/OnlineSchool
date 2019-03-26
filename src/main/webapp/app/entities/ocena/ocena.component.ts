import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOcena } from 'app/shared/model/ocena.model';
import { AccountService } from 'app/core';
import { OcenaService } from './ocena.service';

@Component({
    selector: 'jhi-ocena',
    templateUrl: './ocena.component.html'
})
export class OcenaComponent implements OnInit, OnDestroy {
    ocenas: IOcena[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected ocenaService: OcenaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.ocenaService
            .query()
            .pipe(
                filter((res: HttpResponse<IOcena[]>) => res.ok),
                map((res: HttpResponse<IOcena[]>) => res.body)
            )
            .subscribe(
                (res: IOcena[]) => {
                    this.ocenas = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOcenas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOcena) {
        return item.id;
    }

    registerChangeInOcenas() {
        this.eventSubscriber = this.eventManager.subscribe('ocenaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
