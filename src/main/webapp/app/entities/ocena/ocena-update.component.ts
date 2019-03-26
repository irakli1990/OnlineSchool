import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IOcena } from 'app/shared/model/ocena.model';
import { OcenaService } from './ocena.service';
import { IUczen } from 'app/shared/model/uczen.model';
import { UczenService } from 'app/entities/uczen';
import { IPrzedmiot } from 'app/shared/model/przedmiot.model';
import { PrzedmiotService } from 'app/entities/przedmiot';

@Component({
    selector: 'jhi-ocena-update',
    templateUrl: './ocena-update.component.html'
})
export class OcenaUpdateComponent implements OnInit {
    ocena: IOcena;
    isSaving: boolean;

    uczens: IUczen[];

    przedmiots: IPrzedmiot[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected ocenaService: OcenaService,
        protected uczenService: UczenService,
        protected przedmiotService: PrzedmiotService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ocena }) => {
            this.ocena = ocena;
        });
        this.uczenService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUczen[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUczen[]>) => response.body)
            )
            .subscribe((res: IUczen[]) => (this.uczens = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.przedmiotService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IPrzedmiot[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPrzedmiot[]>) => response.body)
            )
            .subscribe((res: IPrzedmiot[]) => (this.przedmiots = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.ocena.id !== undefined) {
            this.subscribeToSaveResponse(this.ocenaService.update(this.ocena));
        } else {
            this.subscribeToSaveResponse(this.ocenaService.create(this.ocena));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IOcena>>) {
        result.subscribe((res: HttpResponse<IOcena>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUczenById(index: number, item: IUczen) {
        return item.id;
    }

    trackPrzedmiotById(index: number, item: IPrzedmiot) {
        return item.id;
    }
}
