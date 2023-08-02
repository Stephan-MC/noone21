import { Component, OnInit, TemplateRef   } from '@angular/core';
import { BsModalRef, BsModalService,ModalOptions } from 'ngx-bootstrap/modal';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {

  modalRef: BsModalRef;
  subscriptions: Subscription[] = [];

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  config: ModalOptions = { class: 'yvideo' };
  openModal(template: TemplateRef<any>) {
    const config: ModalOptions = { class: 'modal-sm' };
   this.modalRef = this.modalService.show(template, this.config);
    document.getElementById("intro_vids").setAttribute("src", "https://www.youtube.com/embed/54MmEfaHb4Y?rel=0&autoplay=1");
    
  }
  

}
