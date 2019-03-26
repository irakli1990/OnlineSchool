import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOcena } from 'app/shared/model/ocena.model';

@Component({
    selector: 'jhi-ocena-detail',
    templateUrl: './ocena-detail.component.html'
})
export class OcenaDetailComponent implements OnInit {
    ocena: IOcena;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ocena }) => {
            this.ocena = ocena;
        });
    }

    previousState() {
        window.history.back();
    }
}
