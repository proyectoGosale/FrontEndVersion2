import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {


  constructor(
    private modalService: NgbModal
  ) {
  }

  openVerticallyCenteredXL(content) {
    return this.modalService.open(content, { centered: true, size: 'xl' });
  }
  openVerticallyCenteredLG(content) {
    return this.modalService.open(content, { centered: true, size: 'lg' });
  }
  openVerticallyCenteredSM(content) {
    return this.modalService.open(content, { centered: true });
  }



}
