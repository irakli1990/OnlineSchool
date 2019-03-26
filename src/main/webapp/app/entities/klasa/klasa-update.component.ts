import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IKlasa } from 'app/shared/model/klasa.model';
import { KlasaService } from './klasa.service';

@Component({
    selector: 'jhi-klasa-update',
    templateUrl: './klasa-update.component.html'
})
export class KlasaUpdateComponent implements OnInit {
    klasa: IKlasa;
    isSaving: boolean;

    constructor(protected klasaService: KlasaService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ klasa }) => {
            this.klasa = klasa;
        });
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
}
