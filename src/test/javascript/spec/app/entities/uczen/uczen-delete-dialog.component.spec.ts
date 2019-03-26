/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OnlineschoolTestModule } from '../../../test.module';
import { UczenDeleteDialogComponent } from 'app/entities/uczen/uczen-delete-dialog.component';
import { UczenService } from 'app/entities/uczen/uczen.service';

describe('Component Tests', () => {
    describe('Uczen Management Delete Component', () => {
        let comp: UczenDeleteDialogComponent;
        let fixture: ComponentFixture<UczenDeleteDialogComponent>;
        let service: UczenService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlineschoolTestModule],
                declarations: [UczenDeleteDialogComponent]
            })
                .overrideTemplate(UczenDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UczenDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UczenService);
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
