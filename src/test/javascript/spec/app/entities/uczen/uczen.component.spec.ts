/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OnlineschoolTestModule } from '../../../test.module';
import { UczenComponent } from 'app/entities/uczen/uczen.component';
import { UczenService } from 'app/entities/uczen/uczen.service';
import { Uczen } from 'app/shared/model/uczen.model';

describe('Component Tests', () => {
    describe('Uczen Management Component', () => {
        let comp: UczenComponent;
        let fixture: ComponentFixture<UczenComponent>;
        let service: UczenService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlineschoolTestModule],
                declarations: [UczenComponent],
                providers: []
            })
                .overrideTemplate(UczenComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UczenComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UczenService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Uczen(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.uczens[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
