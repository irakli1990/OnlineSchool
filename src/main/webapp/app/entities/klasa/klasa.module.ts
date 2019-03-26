import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { OnlineschoolSharedModule } from 'app/shared';
import {
    KlasaComponent,
    KlasaDetailComponent,
    KlasaUpdateComponent,
    KlasaDeletePopupComponent,
    KlasaDeleteDialogComponent,
    klasaRoute,
    klasaPopupRoute
} from './';

const ENTITY_STATES = [...klasaRoute, ...klasaPopupRoute];

@NgModule({
    imports: [OnlineschoolSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [KlasaComponent, KlasaDetailComponent, KlasaUpdateComponent, KlasaDeleteDialogComponent, KlasaDeletePopupComponent],
    entryComponents: [KlasaComponent, KlasaUpdateComponent, KlasaDeleteDialogComponent, KlasaDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlineschoolKlasaModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
