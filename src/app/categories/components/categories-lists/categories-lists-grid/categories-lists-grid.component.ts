import { Component, OnInit, Input } from '@angular/core';
import { ListModel } from 'src/app/categories/models/list';

@Component({
  selector: 'app-categories-lists-grid',
  templateUrl: './categories-lists-grid.component.html',
  styleUrls: ['./categories-lists-grid.component.scss']
})
export class CategoriesListsGridComponent implements OnInit {

  @Input() list: ListModel[];

  constructor() { }

  ngOnInit() {
  }

  public goBack(): void {
    window.history.back()
  }

}
