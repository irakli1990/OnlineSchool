/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OnlineschoolTestModule } from '../../../test.module';
import { KlasaDetailComponent } from 'app/entities/klasa/klasa-detail.component';
import { Klasa } from 'app/shared/model/klasa.model';

describe('Component Tests', () => {
    describe('Klasa Management Detail Component', () => {
        let comp: KlasaDetailComponent;
        let fixture: ComponentFixture<KlasaDetailComponent>;
        const route = ({ data: of({ klasa: new Klasa(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlineschoolTestModule],
                declarations: [KlasaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(KlasaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(KlasaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.klasa).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
