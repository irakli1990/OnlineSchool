/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OnlineschoolTestModule } from '../../../test.module';
import { PrzedmiotComponent } from 'app/entities/przedmiot/przedmiot.component';
import { PrzedmiotService } from 'app/entities/przedmiot/przedmiot.service';
import { Przedmiot } from 'app/shared/model/przedmiot.model';

describe('Component Tests', () => {
    describe('Przedmiot Management Component', () => {
        let comp: PrzedmiotComponent;
        let fixture: ComponentFixture<PrzedmiotComponent>;
        let service: PrzedmiotService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlineschoolTestModule],
                declarations: [PrzedmiotComponent],
                providers: []
            })
                .overrideTemplate(PrzedmiotComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrzedmiotComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrzedmiotService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Przedmiot(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.przedmiots[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
