/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { OnlineschoolTestModule } from '../../../test.module';
import { UczenUpdateComponent } from 'app/entities/uczen/uczen-update.component';
import { UczenService } from 'app/entities/uczen/uczen.service';
import { Uczen } from 'app/shared/model/uczen.model';

describe('Component Tests', () => {
    describe('Uczen Management Update Component', () => {
        let comp: UczenUpdateComponent;
        let fixture: ComponentFixture<UczenUpdateComponent>;
        let service: UczenService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlineschoolTestModule],
                declarations: [UczenUpdateComponent]
            })
                .overrideTemplate(UczenUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UczenUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UczenService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Uczen(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.uczen = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Uczen();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.uczen = entity;
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
