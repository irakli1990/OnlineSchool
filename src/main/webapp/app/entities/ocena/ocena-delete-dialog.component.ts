import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOcena } from 'app/shared/model/ocena.model';
import { OcenaService } from './ocena.service';

@Component({
    selector: 'jhi-ocena-delete-dialog',
    templateUrl: './ocena-delete-dialog.component.html'
})
export class OcenaDeleteDialogComponent {
    ocena: IOcena;

    constructor(protected ocenaService: OcenaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ocenaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ocenaListModification',
                content: 'Deleted an ocena'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ocena-delete-popup',
    template: ''
})
export class OcenaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ocena }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OcenaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.ocena = ocena;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/ocena', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/ocena', { outlets: { popup: null } }]);
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
