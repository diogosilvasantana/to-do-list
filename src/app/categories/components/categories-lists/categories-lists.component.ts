import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListModel } from '../../models/list';
import { ListService } from '../../services/lists.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesListsFormComponent } from './categories-lists-form/categories-lists-form.component';
import { CategoriesListsConfirmDialogComponent } from './categories-lists-confirm-dialog/categories-lists-confirm-dialog.component';


@Component({
  selector: 'app-categories-lists',
  templateUrl: './categories-lists.component.html',
  styleUrls: ['./categories-lists.component.scss']
})
export class CategoriesListsComponent implements OnInit {

  public list: ListModel[];
  public loading: boolean;
  public idCategory: string
  public trouxeResultados: boolean;

  constructor(
    private listService: ListService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.idCategory = this.route.snapshot.params['idCategory']
    this.listarCategoriasListas()
  }

  // LISTAR CATEGORIAS LISTAS
  public listarCategoriasListas(): void {
    this.loading = true
    this.listService.getList(this.idCategory)
      .subscribe(result => {
        this.list = result;

        if (this.list.length < 1) {
          this.trouxeResultados = false;
        } else {
          this.trouxeResultados = true;
        }

        setTimeout(() => {
          this.loading = false;
        }, 1000);

      })
  }

  // ADICIONAR LISTA
  public adicionarLista(): void {
    const modalRef = this.modalService.open(CategoriesListsFormComponent);
    modalRef.componentInstance.editar = false;
    modalRef.componentInstance.lista = { name: '' };
    modalRef.componentInstance.tituloModal = `Nova Lista`;

    modalRef.componentInstance.salvarLista.subscribe((lista) => {

      setTimeout(() => {
        this.listarCategoriasListas()
      }, 1000)

      this.listService.postList(this.idCategory, lista).subscribe(result => {
        const modalRef = this.modalService.open(CategoriesListsConfirmDialogComponent);
        modalRef.componentInstance.sucesso = true;
        if (result) {
          modalRef.componentInstance.tituloModal = `Lista salva com sucesso!`;
          modalRef.componentInstance.conteudoModal = `A lista foi salva com sucesso!`;
        } else {
          modalRef.componentInstance.tituloModal = `Erro!`;
          modalRef.componentInstance.conteudoModal = `Ouve um erro ao tentar salvar a lista. Tente novamente ou contate o administrador do sistema.`;
        }
      })
    })
  }

  // EDITAR LISTA
  public editarLista(lista): void {
    const modalRef = this.modalService.open(CategoriesListsFormComponent);
    modalRef.componentInstance.editar = true;
    modalRef.componentInstance.lista = lista;
    modalRef.componentInstance.tituloModal = `Editar Categoria`;

    modalRef.componentInstance.editLista.subscribe((lista) => {

      setTimeout(() => {
        this.listarCategoriasListas()
      }, 1000)

      this.listService.updateList(this.idCategory, lista.id, lista)
        .subscribe(result => {
          const modalRef = this.modalService.open(CategoriesListsConfirmDialogComponent);
          modalRef.componentInstance.sucesso = true;
          if (result) {
            modalRef.componentInstance.tituloModal = `Lista atualizada com sucesso!`;
            modalRef.componentInstance.conteudoModal = `A lista foi atualizada com sucesso!`;
          } else {
            modalRef.componentInstance.tituloModal = `Erro!`;
            modalRef.componentInstance.conteudoModal = `Ouve um erro ao tentar atualizar a categoria. Tente novamente ou contate o administrador do sistema.`;
          }
        })
    })
  }

  // EXCLUIR LISTA
  public excluirLista(lista): void {
    const modalRef = this.modalService.open(CategoriesListsConfirmDialogComponent);
    modalRef.componentInstance.sucesso = false;
    modalRef.componentInstance.tituloModal = `Excluir Categoria`;
    modalRef.componentInstance.conteudoModal = `Tem certeza que deseja excluir a lista "${lista.name}"?`;

    modalRef.componentInstance.dialogConfirm
      .subscribe((confirmar) => {
        if (confirmar) {

          this.loading = true;

          setTimeout(() => {
            this.listarCategoriasListas()
          }, 1000)

          this.listService.deleteList(this.idCategory, lista.id)
            .subscribe(result => {
              this.loading = false;
              const modalRef = this.modalService.open(CategoriesListsConfirmDialogComponent);
              modalRef.componentInstance.sucesso = true;
              if (result) {
                modalRef.componentInstance.tituloModal = `Lista Excluida com Sucesso!`;
                modalRef.componentInstance.conteudoModal = `A lista "${lista.name}" foi excluída com sucesso!`;
              } else {
                modalRef.componentInstance.tituloModal = `Erro!`;
                modalRef.componentInstance.conteudoModal = `Ouve um erro ao tentar excluir a categoria. Tente novamente ou contate o administrador do sistema.`;
              }
            })
        }
      })
  }

  public goBack(): void {
    window.history.back()
  }

}
