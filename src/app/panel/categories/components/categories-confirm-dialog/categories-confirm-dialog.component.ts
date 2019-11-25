import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categories-confirm-dialog',
  templateUrl: './categories-confirm-dialog.component.html',
  styleUrls: ['./categories-confirm-dialog.component.scss']
})
export class CategoriesConfirmDialogComponent implements OnInit {

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
