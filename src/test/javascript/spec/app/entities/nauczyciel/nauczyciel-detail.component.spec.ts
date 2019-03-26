/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OnlineschoolTestModule } from '../../../test.module';
import { NauczycielDetailComponent } from 'app/entities/nauczyciel/nauczyciel-detail.component';
import { Nauczyciel } from 'app/shared/model/nauczyciel.model';

describe('Component Tests', () => {
    describe('Nauczyciel Management Detail Component', () => {
        let comp: NauczycielDetailComponent;
        let fixture: ComponentFixture<NauczycielDetailComponent>;
        const route = ({ data: of({ nauczyciel: new Nauczyciel(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlineschoolTestModule],
                declarations: [NauczycielDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(NauczycielDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NauczycielDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.nauczyciel).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
