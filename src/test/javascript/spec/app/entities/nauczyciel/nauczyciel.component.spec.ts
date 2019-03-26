/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OnlineschoolTestModule } from '../../../test.module';
import { NauczycielComponent } from 'app/entities/nauczyciel/nauczyciel.component';
import { NauczycielService } from 'app/entities/nauczyciel/nauczyciel.service';
import { Nauczyciel } from 'app/shared/model/nauczyciel.model';

describe('Component Tests', () => {
    describe('Nauczyciel Management Component', () => {
        let comp: NauczycielComponent;
        let fixture: ComponentFixture<NauczycielComponent>;
        let service: NauczycielService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlineschoolTestModule],
                declarations: [NauczycielComponent],
                providers: []
            })
                .overrideTemplate(NauczycielComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NauczycielComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NauczycielService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Nauczyciel(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.nauczyciels[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
