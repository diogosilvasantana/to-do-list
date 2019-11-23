import { Component, OnInit} from '@angular/core';
import { CategoriesModel } from './models/categories';
import { CategoriesService } from './services/categories.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesConfirmDialogComponent } from './components/categories-confirm-dialog/categories-confirm-dialog.component';
import { CategoriesFormComponent } from './components/categories-form/categories-form.component';

import {MatIconRegistry} from '@angular/material/icon';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public categories: CategoriesModel[];
  public categoria: CategoriesModel;
  public loading: boolean = false;
  public trouxeResultados: boolean = false;

  constructor(
    private categoriesService: CategoriesService,
    private modalService: NgbModal,
    
  ) { }

  ngOnInit() {
    this.listarCategorias();
  }

    // LISTAR CATEGORIAS
  public listarCategorias(): void {
    this.loading = true;
    this.categoriesService.getCategories()
      .subscribe(result => {
        this.categories = result;

        if (this.categories.length === 0){
          this.trouxeResultados = false;
        } else {
          this.trouxeResultados = true;
        }

        setTimeout(() => {
          this.loading = false;
        }, 1000);
      })
  }

  // ADICIONAR CATEGORIA
  public adicionarCategoria(): void {
    const modalRef = this.modalService.open(CategoriesFormComponent);
    modalRef.componentInstance.editar = false;
    modalRef.componentInstance.categoria = { name: '' };
    modalRef.componentInstance.tituloModal = `Nova Categoria`;

    modalRef.componentInstance.salvarCategoria.subscribe((categoria) => {

      setTimeout(() => {
        this.listarCategorias()
      }, 1000)

      this.categoriesService.postCategories(categoria).subscribe(result => {
        const modalRef = this.modalService.open(CategoriesConfirmDialogComponent);
        modalRef.componentInstance.sucesso = true;
        if (result) {
          modalRef.componentInstance.tituloModal = `Categoria salva com sucesso!`;
          modalRef.componentInstance.conteudoModal = `A categoria foi salva com sucesso!`;
        } else {
          modalRef.componentInstance.tituloModal = `Erro!`;
          modalRef.componentInstance.conteudoModal = `Ouve um erro ao tentar atualizar a categoria. Tente novamente ou contate o administrador do sistema.`;
        }
      })
    })
  }

  // EDITAR CATEGORIA
  public editarCategoria(categoria): void {
    const modalRef = this.modalService.open(CategoriesFormComponent);
    modalRef.componentInstance.editar = true;
    modalRef.componentInstance.categoria = categoria;
    modalRef.componentInstance.tituloModal = `Editar Categoria`;

    modalRef.componentInstance.editCategoria.subscribe((categoria) => {
      this.categoriesService.updateCategories(categoria.id, categoria)
        .subscribe(result => {
          const modalRef = this.modalService.open(CategoriesConfirmDialogComponent);
          modalRef.componentInstance.sucesso = true;
          if (result) {
            modalRef.componentInstance.tituloModal = `Categoria atualizada com sucesso!`;
            modalRef.componentInstance.conteudoModal = `A categoria foi excluída com sucesso!`;
          } else {
            modalRef.componentInstance.tituloModal = `Erro!`;
            modalRef.componentInstance.conteudoModal = `Ouve um erro ao tentar atualizar a categoria. Tente novamente ou contate o administrador do sistema.`;
          }
        })
    })
  }

  // EXCLUIR CATEGORIA
  public excluirCategoria(categoria): void {
    const modalRef = this.modalService.open(CategoriesConfirmDialogComponent);
    modalRef.componentInstance.sucesso = false;
    modalRef.componentInstance.tituloModal = `Excluir Categoria`;
    modalRef.componentInstance.conteudoModal = `Tem certeza que deseja excluir a categoria "${categoria.name}"?`;

    modalRef.componentInstance.dialogConfirm
      .subscribe((confirmar) => {
        if (confirmar) {

          this.loading = true;

          setTimeout(() => {
            const index = this.categories.indexOf(categoria)
            this.categories.splice(index, 1)

            this.categoriesService.deleteCategories(categoria.id)
              .subscribe(result => {
                this.loading = false;
                const modalRef = this.modalService.open(CategoriesConfirmDialogComponent);
                modalRef.componentInstance.sucesso = true;
                if (result) {
                  modalRef.componentInstance.tituloModal = `Categoria Excluida com Sucesso!`;
                  modalRef.componentInstance.conteudoModal = `A categoria "${categoria.name}" foi excluída com sucesso!`;
                } else {
                  modalRef.componentInstance.tituloModal = `Erro!`;
                  modalRef.componentInstance.conteudoModal = `Ouve um erro ao tentar excluir a categoria. Tente novamente ou contate o administrador do sistema.`;
                }
              })
          }, 1000);

        }
      })
  }
}
