/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OnlineschoolTestModule } from '../../../test.module';
import { PrzedmiotDetailComponent } from 'app/entities/przedmiot/przedmiot-detail.component';
import { Przedmiot } from 'app/shared/model/przedmiot.model';

describe('Component Tests', () => {
    describe('Przedmiot Management Detail Component', () => {
        let comp: PrzedmiotDetailComponent;
        let fixture: ComponentFixture<PrzedmiotDetailComponent>;
        const route = ({ data: of({ przedmiot: new Przedmiot(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlineschoolTestModule],
                declarations: [PrzedmiotDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PrzedmiotDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrzedmiotDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.przedmiot).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
