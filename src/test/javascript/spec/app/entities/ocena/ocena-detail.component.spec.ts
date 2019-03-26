/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OnlineschoolTestModule } from '../../../test.module';
import { OcenaDetailComponent } from 'app/entities/ocena/ocena-detail.component';
import { Ocena } from 'app/shared/model/ocena.model';

describe('Component Tests', () => {
    describe('Ocena Management Detail Component', () => {
        let comp: OcenaDetailComponent;
        let fixture: ComponentFixture<OcenaDetailComponent>;
        const route = ({ data: of({ ocena: new Ocena(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlineschoolTestModule],
                declarations: [OcenaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OcenaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OcenaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.ocena).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
