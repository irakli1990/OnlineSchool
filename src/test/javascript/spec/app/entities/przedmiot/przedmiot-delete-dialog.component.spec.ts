/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OnlineschoolTestModule } from '../../../test.module';
import { PrzedmiotDeleteDialogComponent } from 'app/entities/przedmiot/przedmiot-delete-dialog.component';
import { PrzedmiotService } from 'app/entities/przedmiot/przedmiot.service';

describe('Component Tests', () => {
    describe('Przedmiot Management Delete Component', () => {
        let comp: PrzedmiotDeleteDialogComponent;
        let fixture: ComponentFixture<PrzedmiotDeleteDialogComponent>;
        let service: PrzedmiotService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlineschoolTestModule],
                declarations: [PrzedmiotDeleteDialogComponent]
            })
                .overrideTemplate(PrzedmiotDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrzedmiotDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrzedmiotService);
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
