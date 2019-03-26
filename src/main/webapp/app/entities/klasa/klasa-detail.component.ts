import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IKlasa } from 'app/shared/model/klasa.model';

@Component({
    selector: 'jhi-klasa-detail',
    templateUrl: './klasa-detail.component.html'
})
export class KlasaDetailComponent implements OnInit {
    klasa: IKlasa;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ klasa }) => {
            this.klasa = klasa;
        });
    }

    previousState() {
        window.history.back();
    }
}
