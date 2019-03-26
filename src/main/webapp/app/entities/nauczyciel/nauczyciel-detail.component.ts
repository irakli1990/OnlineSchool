import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INauczyciel } from 'app/shared/model/nauczyciel.model';

@Component({
    selector: 'jhi-nauczyciel-detail',
    templateUrl: './nauczyciel-detail.component.html'
})
export class NauczycielDetailComponent implements OnInit {
    nauczyciel: INauczyciel;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ nauczyciel }) => {
            this.nauczyciel = nauczyciel;
        });
    }

    previousState() {
        window.history.back();
    }
}
