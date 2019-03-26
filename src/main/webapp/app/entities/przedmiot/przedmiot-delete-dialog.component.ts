import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrzedmiot } from 'app/shared/model/przedmiot.model';
import { PrzedmiotService } from './przedmiot.service';

@Component({
    selector: 'jhi-przedmiot-delete-dialog',
    templateUrl: './przedmiot-delete-dialog.component.html'
})
export class PrzedmiotDeleteDialogComponent {
    przedmiot: IPrzedmiot;

    constructor(
        protected przedmiotService: PrzedmiotService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.przedmiotService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'przedmiotListModification',
                content: 'Deleted an przedmiot'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-przedmiot-delete-popup',
    template: ''
})
export class PrzedmiotDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ przedmiot }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PrzedmiotDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.przedmiot = przedmiot;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/przedmiot', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/przedmiot', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
