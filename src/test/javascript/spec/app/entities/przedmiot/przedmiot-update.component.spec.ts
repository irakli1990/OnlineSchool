/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { OnlineschoolTestModule } from '../../../test.module';
import { PrzedmiotUpdateComponent } from 'app/entities/przedmiot/przedmiot-update.component';
import { PrzedmiotService } from 'app/entities/przedmiot/przedmiot.service';
import { Przedmiot } from 'app/shared/model/przedmiot.model';

describe('Component Tests', () => {
    describe('Przedmiot Management Update Component', () => {
        let comp: PrzedmiotUpdateComponent;
        let fixture: ComponentFixture<PrzedmiotUpdateComponent>;
        let service: PrzedmiotService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlineschoolTestModule],
                declarations: [PrzedmiotUpdateComponent]
            })
                .overrideTemplate(PrzedmiotUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrzedmiotUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrzedmiotService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Przedmiot(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.przedmiot = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Przedmiot();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.przedmiot = entity;
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
