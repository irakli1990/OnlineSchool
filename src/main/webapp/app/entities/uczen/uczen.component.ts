import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUczen } from 'app/shared/model/uczen.model';
import { AccountService } from 'app/core';
import { UczenService } from './uczen.service';

@Component({
    selector: 'jhi-uczen',
    templateUrl: './uczen.component.html'
})
export class UczenComponent implements OnInit, OnDestroy {
    uczens: IUczen[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected uczenService: UczenService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.uczenService
            .query()
            .pipe(
                filter((res: HttpResponse<IUczen[]>) => res.ok),
                map((res: HttpResponse<IUczen[]>) => res.body)
            )
            .subscribe(
                (res: IUczen[]) => {
                    this.uczens = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUczens();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUczen) {
        return item.id;
    }

    registerChangeInUczens() {
        this.eventSubscriber = this.eventManager.subscribe('uczenListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
