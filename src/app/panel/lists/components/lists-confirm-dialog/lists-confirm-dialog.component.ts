import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categories-lists-confirm-dialog',
  templateUrl: './lists-confirm-dialog.component.html',
  styleUrls: ['./lists-confirm-dialog.component.scss']
})
export class ListsConfirmDialogComponent implements OnInit {

  @Input() tituloModal;
  @Input() conteudoModal;
  @Input() successo;
  @Output() dialogConfirm = new EventEmitter();
  confirm: boolean = true;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  public confirmar(){
    this.dialogConfirm.emit(this.confirm);
    this.activeModal.close();
  }

  public fechar(){
    this.activeModal.close();
  }

}
