import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) { }

  @Input() tituloModal;
  @Input() conteudoModal;
  @Output() dialogConfirm = new EventEmitter();

  ngOnInit() {
  }

  public confirmar(){
    this.dialogConfirm.emit("true")
  }
}
