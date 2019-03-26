import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { OnlineschoolSharedModule } from 'app/shared';
import {
    PrzedmiotComponent,
    PrzedmiotDetailComponent,
    PrzedmiotUpdateComponent,
    PrzedmiotDeletePopupComponent,
    PrzedmiotDeleteDialogComponent,
    przedmiotRoute,
    przedmiotPopupRoute
} from './';

const ENTITY_STATES = [...przedmiotRoute, ...przedmiotPopupRoute];

@NgModule({
    imports: [OnlineschoolSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PrzedmiotComponent,
        PrzedmiotDetailComponent,
        PrzedmiotUpdateComponent,
        PrzedmiotDeleteDialogComponent,
        PrzedmiotDeletePopupComponent
    ],
    entryComponents: [PrzedmiotComponent, PrzedmiotUpdateComponent, PrzedmiotDeleteDialogComponent, PrzedmiotDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlineschoolPrzedmiotModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
