import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUczen } from 'app/shared/model/uczen.model';

@Component({
    selector: 'jhi-uczen-detail',
    templateUrl: './uczen-detail.component.html'
})
export class UczenDetailComponent implements OnInit {
    uczen: IUczen;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ uczen }) => {
            this.uczen = uczen;
        });
    }

    previousState() {
        window.history.back();
    }
}
