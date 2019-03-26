/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OnlineschoolTestModule } from '../../../test.module';
import { UczenDetailComponent } from 'app/entities/uczen/uczen-detail.component';
import { Uczen } from 'app/shared/model/uczen.model';

describe('Component Tests', () => {
    describe('Uczen Management Detail Component', () => {
        let comp: UczenDetailComponent;
        let fixture: ComponentFixture<UczenDetailComponent>;
        const route = ({ data: of({ uczen: new Uczen(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlineschoolTestModule],
                declarations: [UczenDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(UczenDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UczenDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.uczen).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
