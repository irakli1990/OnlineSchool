/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { OnlineschoolTestModule } from '../../../test.module';
import { NauczycielUpdateComponent } from 'app/entities/nauczyciel/nauczyciel-update.component';
import { NauczycielService } from 'app/entities/nauczyciel/nauczyciel.service';
import { Nauczyciel } from 'app/shared/model/nauczyciel.model';

describe('Component Tests', () => {
    describe('Nauczyciel Management Update Component', () => {
        let comp: NauczycielUpdateComponent;
        let fixture: ComponentFixture<NauczycielUpdateComponent>;
        let service: NauczycielService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlineschoolTestModule],
                declarations: [NauczycielUpdateComponent]
            })
                .overrideTemplate(NauczycielUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NauczycielUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NauczycielService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Nauczyciel(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.nauczyciel = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Nauczyciel();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.nauczyciel = entity;
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
