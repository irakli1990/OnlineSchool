import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUczen } from 'app/shared/model/uczen.model';
import { UczenService } from './uczen.service';

@Component({
    selector: 'jhi-uczen-delete-dialog',
    templateUrl: './uczen-delete-dialog.component.html'
})
export class UczenDeleteDialogComponent {
    uczen: IUczen;

    constructor(protected uczenService: UczenService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.uczenService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'uczenListModification',
                content: 'Deleted an uczen'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-uczen-delete-popup',
    template: ''
})
export class UczenDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ uczen }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UczenDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.uczen = uczen;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/uczen', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/uczen', { outlets: { popup: null } }]);
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
