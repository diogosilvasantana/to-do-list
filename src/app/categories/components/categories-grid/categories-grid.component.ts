import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoriesModel } from '../../models/categories';

@Component({
  selector: 'app-categories-grid',
  templateUrl: './categories-grid.component.html',
  styleUrls: ['./categories-grid.component.scss']
})
export class CategoriesGridComponent implements OnInit {

  @Input() listaCategorias: CategoriesModel[];
  @Output() editarCategoria = new EventEmitter();
  @Output() excluirCategoria = new EventEmitter();

  public itensPorPagina = 5;

  constructor() { }

  ngOnInit() {
  }

  public editar(categoria){
    this.editarCategoria.emit(categoria)
  }

  public excluir(categoria){
    this.excluirCategoria.emit(categoria)
  }
}
