/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { OnlineschoolTestModule } from '../../../test.module';
import { KlasaUpdateComponent } from 'app/entities/klasa/klasa-update.component';
import { KlasaService } from 'app/entities/klasa/klasa.service';
import { Klasa } from 'app/shared/model/klasa.model';

describe('Component Tests', () => {
    describe('Klasa Management Update Component', () => {
        let comp: KlasaUpdateComponent;
        let fixture: ComponentFixture<KlasaUpdateComponent>;
        let service: KlasaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlineschoolTestModule],
                declarations: [KlasaUpdateComponent]
            })
                .overrideTemplate(KlasaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(KlasaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KlasaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Klasa(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.klasa = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Klasa();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.klasa = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
