import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ItemsModel } from '../../models/items';

@Component({
  selector: 'app-list-items-grid',
  templateUrl: './items-grid.component.html',
  styleUrls: ['./items-grid.component.scss']
})
export class ItemsGridComponent implements OnInit {

  @Input() items: ItemsModel[];
  @Output() editarItem = new EventEmitter();
  @Output() excluirItem = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public editar(item){
    this.editarItem.emit(item)
  }

  public excluir(item){
    this.excluirItem.emit(item)
  }



}
