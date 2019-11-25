import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CategoriesConfirmDialogComponent } from '../categories-confirm-dialog/categories-confirm-dialog.component';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  @Input() categoria;
  @Input() editar;
  @Output() salvarCategoria = new EventEmitter();
  @Output() editCategoria = new EventEmitter();
  public categoriaForm: FormGroup;
  public categoriaInput;
  public loading: boolean;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit() {
    this.categoriaInput = this.categoria
    this.criarForm()
  }

  public criarForm() {
    if (this.editar){
      this.categoriaForm = this.fb.group({
        name: this.categoria.name
      })
    } else {
      this.categoriaForm = this.fb.group({
        name: new FormControl('')
      })
    }
  }

  public salvar() {
    const modalRef = this.modalService.open(CategoriesConfirmDialogComponent);
    modalRef.componentInstance.sucesso = false;
    modalRef.componentInstance.tituloModal = `Salvar Categoria`;
    modalRef.componentInstance.conteudoModal = `Tem certeza que deseja salvar a categoria "${this.categoriaForm.get('name').value}"?`;

    modalRef.componentInstance.dialogConfirm
      .subscribe((confirmar) => {
        if (confirmar) {

          this.loading = true;

          setTimeout(() => {
            this.categoria.name = this.categoriaForm.get('name').value
            this.salvarCategoria.emit(this.categoria)
            this.loading = false;
            this.fechar()
          }, 1000);
        }
      })
  }

  public atualizar() {
    const modalRef = this.modalService.open(CategoriesConfirmDialogComponent);
    modalRef.componentInstance.sucesso = false;
    modalRef.componentInstance.tituloModal = `Atualizar Categoria`;
    modalRef.componentInstance.conteudoModal = `Tem certeza que deseja atualizar a categoria "${this.categoria.name}" para "${this.categoriaForm.get('name').value}"?`;

    modalRef.componentInstance.dialogConfirm
      .subscribe((confirmar) => {
        if (confirmar) {

          this.loading = true;

          setTimeout(() => {
            this.categoria.name = this.categoriaForm.get('name').value
            this.editCategoria.emit(this.categoria)
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
