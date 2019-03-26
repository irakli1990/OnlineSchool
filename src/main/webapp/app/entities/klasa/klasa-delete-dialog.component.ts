import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IKlasa } from 'app/shared/model/klasa.model';
import { KlasaService } from './klasa.service';

@Component({
    selector: 'jhi-klasa-delete-dialog',
    templateUrl: './klasa-delete-dialog.component.html'
})
export class KlasaDeleteDialogComponent {
    klasa: IKlasa;

    constructor(protected klasaService: KlasaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.klasaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'klasaListModification',
                content: 'Deleted an klasa'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-klasa-delete-popup',
    template: ''
})
export class KlasaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ klasa }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(KlasaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.klasa = klasa;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/klasa', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/klasa', { outlets: { popup: null } }]);
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
