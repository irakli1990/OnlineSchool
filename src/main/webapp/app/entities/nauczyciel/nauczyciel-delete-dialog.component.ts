import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INauczyciel } from 'app/shared/model/nauczyciel.model';
import { NauczycielService } from './nauczyciel.service';

@Component({
    selector: 'jhi-nauczyciel-delete-dialog',
    templateUrl: './nauczyciel-delete-dialog.component.html'
})
export class NauczycielDeleteDialogComponent {
    nauczyciel: INauczyciel;

    constructor(
        protected nauczycielService: NauczycielService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.nauczycielService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'nauczycielListModification',
                content: 'Deleted an nauczyciel'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-nauczyciel-delete-popup',
    template: ''
})
export class NauczycielDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ nauczyciel }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(NauczycielDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.nauczyciel = nauczyciel;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/nauczyciel', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/nauczyciel', { outlets: { popup: null } }]);
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
