import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { OnlineschoolSharedModule } from 'app/shared';
import {
    OcenaComponent,
    OcenaDetailComponent,
    OcenaUpdateComponent,
    OcenaDeletePopupComponent,
    OcenaDeleteDialogComponent,
    ocenaRoute,
    ocenaPopupRoute
} from './';

const ENTITY_STATES = [...ocenaRoute, ...ocenaPopupRoute];

@NgModule({
    imports: [OnlineschoolSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [OcenaComponent, OcenaDetailComponent, OcenaUpdateComponent, OcenaDeleteDialogComponent, OcenaDeletePopupComponent],
    entryComponents: [OcenaComponent, OcenaUpdateComponent, OcenaDeleteDialogComponent, OcenaDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlineschoolOcenaModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
