import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categories-lists-confirm-dialog',
  templateUrl: './categories-lists-confirm-dialog.component.html',
  styleUrls: ['./categories-lists-confirm-dialog.component.scss']
})
export class CategoriesListsConfirmDialogComponent implements OnInit {

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
