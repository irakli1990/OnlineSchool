import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPrzedmiot } from 'app/shared/model/przedmiot.model';
import { PrzedmiotService } from './przedmiot.service';
import { INauczyciel } from 'app/shared/model/nauczyciel.model';
import { NauczycielService } from 'app/entities/nauczyciel';

@Component({
    selector: 'jhi-przedmiot-update',
    templateUrl: './przedmiot-update.component.html'
})
export class PrzedmiotUpdateComponent implements OnInit {
    przedmiot: IPrzedmiot;
    isSaving: boolean;

    nauczyciels: INauczyciel[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected przedmiotService: PrzedmiotService,
        protected nauczycielService: NauczycielService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ przedmiot }) => {
            this.przedmiot = przedmiot;
        });
        this.nauczycielService
            .query({ filter: 'przedmiot-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<INauczyciel[]>) => mayBeOk.ok),
                map((response: HttpResponse<INauczyciel[]>) => response.body)
            )
            .subscribe(
                (res: INauczyciel[]) => {
                    if (!this.przedmiot.nauczyciel || !this.przedmiot.nauczyciel.id) {
                        this.nauczyciels = res;
                    } else {
                        this.nauczycielService
                            .find(this.przedmiot.nauczyciel.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<INauczyciel>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<INauczyciel>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: INauczyciel) => (this.nauczyciels = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.przedmiot.id !== undefined) {
            this.subscribeToSaveResponse(this.przedmiotService.update(this.przedmiot));
        } else {
            this.subscribeToSaveResponse(this.przedmiotService.create(this.przedmiot));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrzedmiot>>) {
        result.subscribe((res: HttpResponse<IPrzedmiot>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackNauczycielById(index: number, item: INauczyciel) {
        return item.id;
    }
}
