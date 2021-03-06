import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListModel } from './models/list';
import { ListService } from './services/lists.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListsFormComponent } from './components/lists-form/lists-form.component';
import { ListsConfirmDialogComponent } from './components/lists-confirm-dialog/lists-confirm-dialog.component';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-categories-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  public list: ListModel[];
  public loading: boolean;
  public idCategory: string
  public trouxeResultados: boolean;

  constructor(
    private listService: ListService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('ALELO - Teste Front-end | Listas')
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
    const modalRef = this.modalService.open(ListsFormComponent);
    modalRef.componentInstance.editar = false;
    modalRef.componentInstance.lista = { name: '' };
    modalRef.componentInstance.tituloModal = `Nova Lista`;

    modalRef.componentInstance.salvarLista.subscribe((lista) => {

      setTimeout(() => {
        this.listarCategoriasListas()
      }, 1000)

      this.listService.postList(this.idCategory, lista).subscribe(result => {
        const modalRef = this.modalService.open(ListsConfirmDialogComponent);
        modalRef.componentInstance.sucesso = true;
          modalRef.componentInstance.tituloModal = `Lista salva com sucesso!`;
          modalRef.componentInstance.conteudoModal = `A lista foi salva com sucesso!`;
      }, error => {
        setTimeout(() => {
          const modalRef = this.modalService.open(ListsConfirmDialogComponent);
          modalRef.componentInstance.sucesso = true;
          modalRef.componentInstance.tituloModal = `Erro!`;
          modalRef.componentInstance.conteudoModal = `
          Ouve um erro ao tentar salvar a lista. Tente novamente ou contate o administrador do sistema. Código do erro: ${error.status} - ${error.statusText}`;
        }, 1000)
      })
    })
  }

  // EDITAR LISTA
  public editarLista(lista): void {
    const modalRef = this.modalService.open(ListsFormComponent);
    modalRef.componentInstance.editar = true;
    modalRef.componentInstance.lista = lista;
    modalRef.componentInstance.tituloModal = `Atualizar Lista`;

    modalRef.componentInstance.editLista.subscribe((lista) => {

      setTimeout(() => {
        this.listarCategoriasListas()
      }, 1000)

      this.listService.updateList(this.idCategory, lista.id, lista)
        .subscribe(result => {
          const modalRef = this.modalService.open(ListsConfirmDialogComponent);
          modalRef.componentInstance.sucesso = true;
            modalRef.componentInstance.tituloModal = `Lista atualizada com sucesso!`;
            modalRef.componentInstance.conteudoModal = `A lista foi atualizada com sucesso!`;
        }, error => {
          setTimeout(() => {
            const modalRef = this.modalService.open(ListsConfirmDialogComponent);
            modalRef.componentInstance.sucesso = true;
            modalRef.componentInstance.tituloModal = `Erro!`;
            modalRef.componentInstance.conteudoModal = `
            Ouve um erro ao tentar atualizar a lista. Tente novamente ou contate o administrador do sistema. Código do erro: ${error.status} - ${error.statusText}`;
          }, 1000)
        })
    })
  }

  // EXCLUIR LISTA
  public excluirLista(lista): void {
    const modalRef = this.modalService.open(ListsConfirmDialogComponent);
    modalRef.componentInstance.sucesso = false;
    modalRef.componentInstance.tituloModal = `Excluir Lista`;
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
              const modalRef = this.modalService.open(ListsConfirmDialogComponent);
              modalRef.componentInstance.sucesso = true;
              if (result) {
                modalRef.componentInstance.tituloModal = `Lista Excluida com Sucesso!`;
                modalRef.componentInstance.conteudoModal = `A lista "${lista.name}" foi excluída com sucesso!`;
              } else {
                modalRef.componentInstance.tituloModal = `Erro!`;
                modalRef.componentInstance.conteudoModal = `Ouve um erro ao tentar excluir a categoria. Tente novamente ou contate o administrador do sistema.`;
              }
            }, error => {
              setTimeout(() => {
                const modalRef = this.modalService.open(ListsConfirmDialogComponent);
                modalRef.componentInstance.sucesso = true;
                modalRef.componentInstance.tituloModal = `Erro!`;
                modalRef.componentInstance.conteudoModal = `
                Ouve um erro ao tentar excluir a lista. Tente novamente ou contate o administrador do sistema. Código do erro: ${error.status} - ${error.statusText}`;
              }, 1000)
            })
        }
      })
  }

  public goBack(): void {
    window.history.back()
  }

}
