import { Component, OnInit } from '@angular/core';
import { ItemsService } from './services/items.service';
import { ActivatedRoute } from '@angular/router';
import { ItemsModel } from './models/items';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemsConfirmDialogComponent } from './components/items-confirm-dialog/items-confirm-dialog.component';
import { ItemsFormComponent } from './components/items-form/items-form.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-list-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  public items: ItemsModel[]
  public loading: boolean;
  public trouxeResultados: boolean;
  public idCategory = this.route.snapshot.params['idCategory'];
  public idList = this.route.snapshot.params['idList'];
  public idItem = this.route.snapshot.params['idItem'];

  constructor(
    private itemsService: ItemsService, 
    private route: ActivatedRoute, 
    private modalService: NgbModal,
    private title: Title
    ) { }

  ngOnInit() {
    this.title.setTitle('ALELO - Teste Front-end | Itens')
    this.listarItens()
  }

  public listarItens(): void {
    this.loading = true
    this.itemsService.getItem(this.idCategory, this.idList)
      .subscribe(result => {
        this.items = result

        if (this.items.length < 1) {
          this.trouxeResultados = false;
        } else {
          this.trouxeResultados = true;
        }

        setTimeout(() => {
          this.loading = false;
        }, 1000);
      })
  }

  // ADICIONAR ITEM
  public adicionarItem(): void {
    const modalRef = this.modalService.open(ItemsFormComponent);
    modalRef.componentInstance.editar = false;
    modalRef.componentInstance.item = { name: '' };
    modalRef.componentInstance.tituloModal = `Novo Item`;

    modalRef.componentInstance.salvarItem.subscribe((item) => {

      setTimeout(() => {
        this.listarItens()
      }, 1000)

      this.itemsService.postItem(this.idCategory, this.idList, item).subscribe(result => {
        const modalRef = this.modalService.open(ItemsConfirmDialogComponent);
        modalRef.componentInstance.sucesso = true;
          modalRef.componentInstance.tituloModal = `Item salvo com sucesso!`;
          modalRef.componentInstance.conteudoModal = `O item foi salvo com sucesso!`;
      }, error => {
        setTimeout(() => {
          const modalRef = this.modalService.open(ItemsConfirmDialogComponent);
          modalRef.componentInstance.sucesso = true;
          modalRef.componentInstance.tituloModal = `Erro!`;
          modalRef.componentInstance.conteudoModal = `
          Ouve um erro ao tentar salvar o item. Tente novamente ou contate o administrador do sistema. Código do erro: ${error.status} - ${error.statusText}`;
        }, 1000)
      })
    })
  }

  // EDITAR ITEM
  public editarItem(item): void {
    const modalRef = this.modalService.open(ItemsFormComponent);
    modalRef.componentInstance.editar = true;
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.tituloModal = `Atualizar Item`;

    modalRef.componentInstance.editItem.subscribe((item) => {

      setTimeout(() => {
        this.listarItens()
      }, 1000)

      this.itemsService.updateItem(this.idCategory, this.idList, item.id, item)
        .subscribe(result => {
          const modalRef = this.modalService.open(ItemsConfirmDialogComponent);
          modalRef.componentInstance.sucesso = true;
            modalRef.componentInstance.tituloModal = `Item atualizado com sucesso!`;
            modalRef.componentInstance.conteudoModal = `O item foi atualizado com sucesso!`;
        }, error => {
          setTimeout(() => {
            const modalRef = this.modalService.open(ItemsConfirmDialogComponent);
            modalRef.componentInstance.sucesso = true;
            modalRef.componentInstance.tituloModal = `Erro!`;
            modalRef.componentInstance.conteudoModal = `
            Ouve um erro ao tentar atualizar o item. Tente novamente ou contate o administrador do sistema. Código do erro: ${error.status} - ${error.statusText}`;
          }, 1000)
        })
    })
  }

  // EXCLUIR ITEM
  public excluirItem(item): void {
    const modalRef = this.modalService.open(ItemsConfirmDialogComponent);
    modalRef.componentInstance.sucesso = false;
    modalRef.componentInstance.tituloModal = `Excluir Item`;
    modalRef.componentInstance.conteudoModal = `Tem certeza que deseja excluir o item "${item.name}"?`;

    modalRef.componentInstance.dialogConfirm
      .subscribe((confirmar) => {
        if (confirmar) {


          setTimeout(() => {
            this.listarItens()
          }, 1000)

            this.itemsService.deleteItem(this.idCategory, this.idList, item.id)
              .subscribe(result => {
                this.loading = false;
                const modalRef = this.modalService.open(ItemsConfirmDialogComponent);
                modalRef.componentInstance.sucesso = true;
                  modalRef.componentInstance.tituloModal = `Item Excluido com Sucesso!`;
                  modalRef.componentInstance.conteudoModal = `O item "${item.name}" foi excluído com sucesso!`;
              }, error => {
                setTimeout(() => {
                  const modalRef = this.modalService.open(ItemsConfirmDialogComponent);
                  modalRef.componentInstance.sucesso = true;
                  modalRef.componentInstance.tituloModal = `Erro!`;
                  modalRef.componentInstance.conteudoModal = `
                  Ouve um erro ao tentar excluir o item. Tente novamente ou contate o administrador do sistema. Código do erro: ${error.status} - ${error.statusText}`;
                }, 1000)
              })
        }
      })
  }

  public goBack(): void {
    window.history.back()
  }
}
