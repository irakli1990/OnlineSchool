import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IPrzedmiot } from 'app/shared/model/przedmiot.model';
import { PrzedmiotService } from './przedmiot.service';

@Component({
    selector: 'jhi-przedmiot-update',
    templateUrl: './przedmiot-update.component.html'
})
export class PrzedmiotUpdateComponent implements OnInit {
    przedmiot: IPrzedmiot;
    isSaving: boolean;

    constructor(protected przedmiotService: PrzedmiotService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ przedmiot }) => {
            this.przedmiot = przedmiot;
        });
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
}
