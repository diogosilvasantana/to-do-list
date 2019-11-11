import { Component, OnInit, Input } from '@angular/core';
import { ItemsModel } from 'src/app/categories/models/items';

@Component({
  selector: 'app-list-items-grid',
  templateUrl: './list-items-grid.component.html',
  styleUrls: ['./list-items-grid.component.scss']
})
export class ListItemsGridComponent implements OnInit {

  @Input() items: ItemsModel[];

  constructor() { }

  ngOnInit() {
  }

  public goBack(): void {
    window.history.back()
  }

}
