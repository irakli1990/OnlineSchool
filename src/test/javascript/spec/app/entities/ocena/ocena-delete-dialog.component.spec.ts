/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OnlineschoolTestModule } from '../../../test.module';
import { OcenaDeleteDialogComponent } from 'app/entities/ocena/ocena-delete-dialog.component';
import { OcenaService } from 'app/entities/ocena/ocena.service';

describe('Component Tests', () => {
    describe('Ocena Management Delete Component', () => {
        let comp: OcenaDeleteDialogComponent;
        let fixture: ComponentFixture<OcenaDeleteDialogComponent>;
        let service: OcenaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlineschoolTestModule],
                declarations: [OcenaDeleteDialogComponent]
            })
                .overrideTemplate(OcenaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OcenaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OcenaService);
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
