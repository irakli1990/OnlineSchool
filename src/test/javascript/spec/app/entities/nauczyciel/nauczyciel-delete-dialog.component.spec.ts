/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OnlineschoolTestModule } from '../../../test.module';
import { NauczycielDeleteDialogComponent } from 'app/entities/nauczyciel/nauczyciel-delete-dialog.component';
import { NauczycielService } from 'app/entities/nauczyciel/nauczyciel.service';

describe('Component Tests', () => {
    describe('Nauczyciel Management Delete Component', () => {
        let comp: NauczycielDeleteDialogComponent;
        let fixture: ComponentFixture<NauczycielDeleteDialogComponent>;
        let service: NauczycielService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlineschoolTestModule],
                declarations: [NauczycielDeleteDialogComponent]
            })
                .overrideTemplate(NauczycielDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NauczycielDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NauczycielService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
