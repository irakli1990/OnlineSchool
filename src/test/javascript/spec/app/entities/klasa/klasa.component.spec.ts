/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OnlineschoolTestModule } from '../../../test.module';
import { KlasaComponent } from 'app/entities/klasa/klasa.component';
import { KlasaService } from 'app/entities/klasa/klasa.service';
import { Klasa } from 'app/shared/model/klasa.model';

describe('Component Tests', () => {
    describe('Klasa Management Component', () => {
        let comp: KlasaComponent;
        let fixture: ComponentFixture<KlasaComponent>;
        let service: KlasaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlineschoolTestModule],
                declarations: [KlasaComponent],
                providers: []
            })
                .overrideTemplate(KlasaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(KlasaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KlasaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Klasa(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.klasas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
