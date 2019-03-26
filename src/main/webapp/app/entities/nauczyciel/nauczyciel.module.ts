import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { OnlineschoolSharedModule } from 'app/shared';
import {
    NauczycielComponent,
    NauczycielDetailComponent,
    NauczycielUpdateComponent,
    NauczycielDeletePopupComponent,
    NauczycielDeleteDialogComponent,
    nauczycielRoute,
    nauczycielPopupRoute
} from './';

const ENTITY_STATES = [...nauczycielRoute, ...nauczycielPopupRoute];

@NgModule({
    imports: [OnlineschoolSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        NauczycielComponent,
        NauczycielDetailComponent,
        NauczycielUpdateComponent,
        NauczycielDeleteDialogComponent,
        NauczycielDeletePopupComponent
    ],
    entryComponents: [NauczycielComponent, NauczycielUpdateComponent, NauczycielDeleteDialogComponent, NauczycielDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlineschoolNauczycielModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
