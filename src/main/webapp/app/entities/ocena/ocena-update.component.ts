import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IOcena } from 'app/shared/model/ocena.model';
import { OcenaService } from './ocena.service';

@Component({
    selector: 'jhi-ocena-update',
    templateUrl: './ocena-update.component.html'
})
export class OcenaUpdateComponent implements OnInit {
    ocena: IOcena;
    isSaving: boolean;

    constructor(protected ocenaService: OcenaService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ocena }) => {
            this.ocena = ocena;
        });
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
}
