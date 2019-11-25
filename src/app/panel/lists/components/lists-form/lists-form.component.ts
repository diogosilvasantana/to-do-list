import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ListsConfirmDialogComponent } from './../lists-confirm-dialog/lists-confirm-dialog.component';

@Component({
  selector: 'app-categories-lists-form',
  templateUrl: './lists-form.component.html',
  styleUrls: ['./lists-form.component.scss']
})
export class ListsFormComponent implements OnInit {

  @Input() lista;
  @Input() editar;
  @Output() salvarLista = new EventEmitter();
  @Output() editLista = new EventEmitter();
  public listaForm: FormGroup;
  public listaInput;
  public loading: boolean;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit() {
    this.listaInput = this.lista
    this.criarForm()
  }

  public criarForm() {
    if (this.editar){
      this.listaForm = this.fb.group({
        name: this.lista.name
      })
    } else {
      this.listaForm = this.fb.group({
        name: new FormControl('')
      })
    }
  }

  public salvar() {
    const modalRef = this.modalService.open(ListsConfirmDialogComponent);
    modalRef.componentInstance.sucesso = false;
    modalRef.componentInstance.tituloModal = `Salvar Lista`;
    modalRef.componentInstance.conteudoModal = `Tem certeza que deseja salvar a lista "${this.listaForm.get('name').value}"?`;

    modalRef.componentInstance.dialogConfirm
      .subscribe((confirmar) => {
        if (confirmar) {

          this.loading = true;

          setTimeout(() => {
            this.lista.name = this.listaForm.get('name').value
            this.salvarLista.emit(this.lista)
            this.loading = false;
            this.fechar()
          }, 1000);
        }
      })
  }

  public atualizar() {
    const modalRef = this.modalService.open(ListsConfirmDialogComponent);
    modalRef.componentInstance.sucesso = false;
    modalRef.componentInstance.tituloModal = `Atualizar Lista`;
    modalRef.componentInstance.conteudoModal = `Tem certeza que deseja atualizar a lista "${this.lista.name}" para "${this.listaForm.get('name').value}"?`;

    modalRef.componentInstance.dialogConfirm
      .subscribe((confirmar) => {
        if (confirmar) {

          this.loading = true;

          setTimeout(() => {
            this.lista.name = this.listaForm.get('name').value
            this.editLista.emit(this.lista)
            this.loading = false;
            this.fechar()
          }, 1000);
        }
      })
  }

  public fechar() {
    this.activeModal.close();
  }

}
