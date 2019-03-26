import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrzedmiot } from 'app/shared/model/przedmiot.model';

@Component({
    selector: 'jhi-przedmiot-detail',
    templateUrl: './przedmiot-detail.component.html'
})
export class PrzedmiotDetailComponent implements OnInit {
    przedmiot: IPrzedmiot;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ przedmiot }) => {
            this.przedmiot = przedmiot;
        });
    }

    previousState() {
        window.history.back();
    }
}
