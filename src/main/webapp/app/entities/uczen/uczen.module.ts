import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { OnlineschoolSharedModule } from 'app/shared';
import {
    UczenComponent,
    UczenDetailComponent,
    UczenUpdateComponent,
    UczenDeletePopupComponent,
    UczenDeleteDialogComponent,
    uczenRoute,
    uczenPopupRoute
} from './';

const ENTITY_STATES = [...uczenRoute, ...uczenPopupRoute];

@NgModule({
    imports: [OnlineschoolSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [UczenComponent, UczenDetailComponent, UczenUpdateComponent, UczenDeleteDialogComponent, UczenDeletePopupComponent],
    entryComponents: [UczenComponent, UczenUpdateComponent, UczenDeleteDialogComponent, UczenDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlineschoolUczenModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
