import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INauczyciel } from 'app/shared/model/nauczyciel.model';
import { AccountService } from 'app/core';
import { NauczycielService } from './nauczyciel.service';

@Component({
    selector: 'jhi-nauczyciel',
    templateUrl: './nauczyciel.component.html'
})
export class NauczycielComponent implements OnInit, OnDestroy {
    nauczyciels: INauczyciel[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected nauczycielService: NauczycielService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.nauczycielService
            .query()
            .pipe(
                filter((res: HttpResponse<INauczyciel[]>) => res.ok),
                map((res: HttpResponse<INauczyciel[]>) => res.body)
            )
            .subscribe(
                (res: INauczyciel[]) => {
                    this.nauczyciels = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInNauczyciels();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: INauczyciel) {
        return item.id;
    }

    registerChangeInNauczyciels() {
        this.eventSubscriber = this.eventManager.subscribe('nauczycielListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
