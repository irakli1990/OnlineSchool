import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IKlasa } from 'app/shared/model/klasa.model';
import { KlasaService } from './klasa.service';
import { INauczyciel } from 'app/shared/model/nauczyciel.model';
import { NauczycielService } from 'app/entities/nauczyciel';

@Component({
    selector: 'jhi-klasa-update',
    templateUrl: './klasa-update.component.html'
})
export class KlasaUpdateComponent implements OnInit {
    klasa: IKlasa;
    isSaving: boolean;

    nauczyciels: INauczyciel[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected klasaService: KlasaService,
        protected nauczycielService: NauczycielService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ klasa }) => {
            this.klasa = klasa;
        });
        this.nauczycielService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<INauczyciel[]>) => mayBeOk.ok),
                map((response: HttpResponse<INauczyciel[]>) => response.body)
            )
            .subscribe((res: INauczyciel[]) => (this.nauczyciels = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.klasa.id !== undefined) {
            this.subscribeToSaveResponse(this.klasaService.update(this.klasa));
        } else {
            this.subscribeToSaveResponse(this.klasaService.create(this.klasa));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IKlasa>>) {
        result.subscribe((res: HttpResponse<IKlasa>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
