import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ListItemsConfirmDialogComponent } from '../list-items-confirm-dialog/list-items-confirm-dialog.component';

@Component({
  selector: 'app-list-items-form',
  templateUrl: './list-items-form.component.html',
  styleUrls: ['./list-items-form.component.scss']
})
export class ListItemsFormComponent implements OnInit {

  @Input() item;
  @Input() editar;
  @Output() salvarItem = new EventEmitter();
  @Output() editItem = new EventEmitter();
  public itemForm: FormGroup;
  public itemInput;
  public loading: boolean;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit() {
    this.itemInput = this.item
    this.criarForm()
  }

  public criarForm() {
    if (this.editar){
      this.itemForm = this.fb.group({
        name: this.item.name,
        done: this.item.done
      })
    } else {
      this.itemForm = this.fb.group({
        name: new FormControl(''),
        done: new FormControl('')
      })
    }
  }

  public salvar() {
    const modalRef = this.modalService.open(ListItemsConfirmDialogComponent);
    modalRef.componentInstance.sucesso = false;
    modalRef.componentInstance.tituloModal = `Salvar Item`;
    modalRef.componentInstance.conteudoModal = `Tem certeza que deseja salvar o item "${this.itemForm.get('name').value}"?`;

    modalRef.componentInstance.dialogConfirm
      .subscribe((confirmar) => {
        if (confirmar) {

          this.loading = true;

          setTimeout(() => {
            this.item.name = this.itemForm.get('name').value
            this.item.done = this.itemForm.value.done;
            this.salvarItem.emit(this.item)
            this.loading = false;
            this.fechar()
          }, 1000);
        }
      })
  }

  public atualizar() {

    if (this.itemForm.value.done != this.item.done || this.itemForm.get('name').value != this.item.name){
    const modalRef = this.modalService.open(ListItemsConfirmDialogComponent);
    modalRef.componentInstance.sucesso = false;
    modalRef.componentInstance.tituloModal = `Atualizar Item`;

    if (this.itemForm.value.done === true && this.itemForm.get('name').value === this.item.name) {
      modalRef.componentInstance.conteudoModal = `Tem certeza que deseja atualizar o item "${this.item.name}" confirmando que foi feito?`;
    } else if (this.itemForm.value.done === false && this.itemForm.get('name').value === this.item.name) {
      modalRef.componentInstance.conteudoModal = `Tem certeza que deseja atualizar o item "${this.item.name}" confirmando que não foi feito?`;
    } else if (this.itemForm.value.done === true && this.itemForm.get('name').value != this.item.name) {
      modalRef.componentInstance.conteudoModal = `Tem certeza que deseja atualizar o item "${this.item.name}" para "${this.itemForm.get('name').value}" e confirmar que foi feito?`;
    } else if (this.itemForm.value.done === false && this.itemForm.get('name').value != this.item.name) {
      modalRef.componentInstance.conteudoModal = `Tem certeza que deseja atualizar o item "${this.item.name}" para "${this.itemForm.get('name').value}" e confirmar que não foi feito?`;
    }

    modalRef.componentInstance.dialogConfirm
      .subscribe((confirmar) => {
        if (confirmar) {

          this.loading = true;

          setTimeout(() => {
            this.item.name = this.itemForm.get('name').value;
            this.item.done = this.itemForm.value.done;
            this.editItem.emit(this.item);
            this.loading = false;
            this.fechar()
          }, 1000);
        }
      })
    } else {
      setTimeout(() => {
        this.item.name = this.itemForm.get('name').value;
        this.item.done = this.itemForm.value.done;
        this.editItem.emit(this.item);
        this.loading = false;
        this.fechar()
      }, 1000);
    }
  }

  public fechar() {
    this.activeModal.close();
  }

}
