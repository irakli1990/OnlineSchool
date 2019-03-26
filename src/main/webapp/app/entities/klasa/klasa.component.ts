import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IKlasa } from 'app/shared/model/klasa.model';
import { AccountService } from 'app/core';
import { KlasaService } from './klasa.service';

@Component({
    selector: 'jhi-klasa',
    templateUrl: './klasa.component.html'
})
export class KlasaComponent implements OnInit, OnDestroy {
    klasas: IKlasa[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected klasaService: KlasaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.klasaService
            .query()
            .pipe(
                filter((res: HttpResponse<IKlasa[]>) => res.ok),
                map((res: HttpResponse<IKlasa[]>) => res.body)
            )
            .subscribe(
                (res: IKlasa[]) => {
                    this.klasas = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInKlasas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IKlasa) {
        return item.id;
    }

    registerChangeInKlasas() {
        this.eventSubscriber = this.eventManager.subscribe('klasaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
