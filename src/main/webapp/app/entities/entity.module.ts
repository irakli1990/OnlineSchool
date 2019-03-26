import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'przedmiot',
                loadChildren: './przedmiot/przedmiot.module#OnlineschoolPrzedmiotModule'
            },
            {
                path: 'klasa',
                loadChildren: './klasa/klasa.module#OnlineschoolKlasaModule'
            },
            {
                path: 'ocena',
                loadChildren: './ocena/ocena.module#OnlineschoolOcenaModule'
            },
            {
                path: 'nauczyciel',
                loadChildren: './nauczyciel/nauczyciel.module#OnlineschoolNauczycielModule'
            },
            {
                path: 'uczen',
                loadChildren: './uczen/uczen.module#OnlineschoolUczenModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlineschoolEntityModule {}
