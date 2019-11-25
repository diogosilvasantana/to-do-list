import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListModel } from './../../models/list';

@Component({
  selector: 'app-categories-lists-grid',
  templateUrl: './lists-grid.component.html',
  styleUrls: ['./lists-grid.component.scss']
})
export class ListsGridComponent implements OnInit {

  @Input() listas: ListModel[];
  @Output() editarLista = new EventEmitter();
  @Output() excluirLista = new EventEmitter();

  @Input() list: ListModel[];

  constructor() { }

  ngOnInit() {
  }

  public editar(lista){
    this.editarLista.emit(lista)
  }

  public excluir(lista){
    this.excluirLista.emit(lista)
  }


}
