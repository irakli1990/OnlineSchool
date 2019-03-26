import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPrzedmiot } from 'app/shared/model/przedmiot.model';
import { AccountService } from 'app/core';
import { PrzedmiotService } from './przedmiot.service';

@Component({
    selector: 'jhi-przedmiot',
    templateUrl: './przedmiot.component.html'
})
export class PrzedmiotComponent implements OnInit, OnDestroy {
    przedmiots: IPrzedmiot[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected przedmiotService: PrzedmiotService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.przedmiotService
            .query()
            .pipe(
                filter((res: HttpResponse<IPrzedmiot[]>) => res.ok),
                map((res: HttpResponse<IPrzedmiot[]>) => res.body)
            )
            .subscribe(
                (res: IPrzedmiot[]) => {
                    this.przedmiots = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPrzedmiots();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPrzedmiot) {
        return item.id;
    }

    registerChangeInPrzedmiots() {
        this.eventSubscriber = this.eventManager.subscribe('przedmiotListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
