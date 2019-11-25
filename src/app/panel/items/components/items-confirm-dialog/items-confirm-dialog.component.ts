import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-items-confirm-dialog',
  templateUrl: './items-confirm-dialog.component.html',
  styleUrls: ['./items-confirm-dialog.component.scss']
})
export class ItemsConfirmDialogComponent implements OnInit {

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
