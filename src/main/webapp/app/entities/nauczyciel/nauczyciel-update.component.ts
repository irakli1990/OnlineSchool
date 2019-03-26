import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { INauczyciel } from 'app/shared/model/nauczyciel.model';
import { NauczycielService } from './nauczyciel.service';

@Component({
    selector: 'jhi-nauczyciel-update',
    templateUrl: './nauczyciel-update.component.html'
})
export class NauczycielUpdateComponent implements OnInit {
    nauczyciel: INauczyciel;
    isSaving: boolean;

    constructor(protected nauczycielService: NauczycielService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ nauczyciel }) => {
            this.nauczyciel = nauczyciel;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.nauczyciel.id !== undefined) {
            this.subscribeToSaveResponse(this.nauczycielService.update(this.nauczyciel));
        } else {
            this.subscribeToSaveResponse(this.nauczycielService.create(this.nauczyciel));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<INauczyciel>>) {
        result.subscribe((res: HttpResponse<INauczyciel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
