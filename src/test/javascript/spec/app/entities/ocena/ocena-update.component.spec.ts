/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { OnlineschoolTestModule } from '../../../test.module';
import { OcenaUpdateComponent } from 'app/entities/ocena/ocena-update.component';
import { OcenaService } from 'app/entities/ocena/ocena.service';
import { Ocena } from 'app/shared/model/ocena.model';

describe('Component Tests', () => {
    describe('Ocena Management Update Component', () => {
        let comp: OcenaUpdateComponent;
        let fixture: ComponentFixture<OcenaUpdateComponent>;
        let service: OcenaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlineschoolTestModule],
                declarations: [OcenaUpdateComponent]
            })
                .overrideTemplate(OcenaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OcenaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OcenaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Ocena(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.ocena = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Ocena();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.ocena = entity;
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
