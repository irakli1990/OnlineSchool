import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { IUczen } from 'app/shared/model/uczen.model';
import { UczenService } from './uczen.service';

@Component({
    selector: 'jhi-uczen-update',
    templateUrl: './uczen-update.component.html'
})
export class UczenUpdateComponent implements OnInit {
    uczen: IUczen;
    isSaving: boolean;
    dataUrodzeniaDp: any;

    constructor(protected uczenService: UczenService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ uczen }) => {
            this.uczen = uczen;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.uczen.id !== undefined) {
            this.subscribeToSaveResponse(this.uczenService.update(this.uczen));
        } else {
            this.subscribeToSaveResponse(this.uczenService.create(this.uczen));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUczen>>) {
        result.subscribe((res: HttpResponse<IUczen>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
