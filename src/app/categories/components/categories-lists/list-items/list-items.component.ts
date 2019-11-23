import { Component, OnInit, Input } from '@angular/core';
import { ItemsService } from 'src/app/categories/services/items.service';
import { ActivatedRoute } from '@angular/router';
import { ItemsModel } from 'src/app/categories/models/items';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListItemsConfirmDialogComponent } from './list-items-confirm-dialog/list-items-confirm-dialog.component';
import { ListItemsFormComponent } from './list-items-form/list-items-form.component';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {

  public items: ItemsModel[]
  public loading: boolean;
  public trouxeResultados: boolean;
  public idCategory = this.route.snapshot.params['idCategory'];
  public idList = this.route.snapshot.params['idList'];
  public idItem = this.route.snapshot.params['idItem'];

  constructor(private itemsService: ItemsService, private route: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit() {
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
    const modalRef = this.modalService.open(ListItemsFormComponent);
    modalRef.componentInstance.editar = false;
    modalRef.componentInstance.item = { name: '' };
    modalRef.componentInstance.tituloModal = `Novo Item`;

    modalRef.componentInstance.salvarItem.subscribe((item) => {

      setTimeout(() => {
        this.listarItens()
      }, 1000)

      this.itemsService.postItem(this.idCategory, this.idList, item).subscribe(result => {
        const modalRef = this.modalService.open(ListItemsConfirmDialogComponent);
        modalRef.componentInstance.sucesso = true;
        if (result) {
          modalRef.componentInstance.tituloModal = `Item salvo com sucesso!`;
          modalRef.componentInstance.conteudoModal = `O item foi salva com sucesso!`;
        } else {
          modalRef.componentInstance.tituloModal = `Erro!`;
          modalRef.componentInstance.conteudoModal = `Ouve um erro ao tentar salvar o item. Tente novamente ou contate o administrador do sistema.`;
        }
      })
    })
  }

  // EDITAR ITEM
  public editarItem(item): void {
    const modalRef = this.modalService.open(ListItemsFormComponent);
    modalRef.componentInstance.editar = true;
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.tituloModal = `Editar Item`;

    modalRef.componentInstance.editItem.subscribe((item) => {

      setTimeout(() => {
        this.listarItens()
      }, 1000)

      this.itemsService.updateItem(this.idCategory, this.idList, item.id, item)
        .subscribe(result => {
          const modalRef = this.modalService.open(ListItemsConfirmDialogComponent);
          modalRef.componentInstance.sucesso = true;
          if (result) {
            modalRef.componentInstance.tituloModal = `Item atualizada com sucesso!`;
            modalRef.componentInstance.conteudoModal = `O item foi atualizada com sucesso!`;
          } else {
            modalRef.componentInstance.tituloModal = `Erro!`;
            modalRef.componentInstance.conteudoModal = `Ouve um erro ao tentar atualizar a categoria. Tente novamente ou contate o administrador do sistema.`;
          }
        })
    })
  }

  // EXCLUIR ITEM
  public excluirItem(item): void {
    const modalRef = this.modalService.open(ListItemsConfirmDialogComponent);
    modalRef.componentInstance.sucesso = false;
    modalRef.componentInstance.tituloModal = `Excluir Categoria`;
    modalRef.componentInstance.conteudoModal = `Tem certeza que deseja excluir a lista "${item.name}"?`;

    modalRef.componentInstance.dialogConfirm
      .subscribe((confirmar) => {
        if (confirmar) {


          setTimeout(() => {
            this.listarItens()
          }, 1000)

            this.itemsService.deleteItem(this.idCategory, this.idList, item.id)
              .subscribe(result => {
                this.loading = false;
                const modalRef = this.modalService.open(ListItemsConfirmDialogComponent);
                modalRef.componentInstance.sucesso = true;
                if (result) {
                  modalRef.componentInstance.tituloModal = `Item Excluido com Sucesso!`;
                  modalRef.componentInstance.conteudoModal = `O item "${item.name}" foi excluída com sucesso!`;
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
