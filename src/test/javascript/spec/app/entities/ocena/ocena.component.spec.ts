/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OnlineschoolTestModule } from '../../../test.module';
import { OcenaComponent } from 'app/entities/ocena/ocena.component';
import { OcenaService } from 'app/entities/ocena/ocena.service';
import { Ocena } from 'app/shared/model/ocena.model';

describe('Component Tests', () => {
    describe('Ocena Management Component', () => {
        let comp: OcenaComponent;
        let fixture: ComponentFixture<OcenaComponent>;
        let service: OcenaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlineschoolTestModule],
                declarations: [OcenaComponent],
                providers: []
            })
                .overrideTemplate(OcenaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OcenaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OcenaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Ocena(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.ocenas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
