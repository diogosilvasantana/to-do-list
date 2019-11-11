import { Component, OnInit, Input } from '@angular/core';
import { CategoriesModel } from '../../models/categories';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-categories-grid',
  templateUrl: './categories-grid.component.html',
  styleUrls: ['./categories-grid.component.scss']
})
export class CategoriesGridComponent implements OnInit {

  @Input() categories: CategoriesModel[];

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {

  }

  public excluirCategoria(id): void{
    this.categoriesService.deleteCategories(id).subscribe(result => {
      console.log(result)
  })
  }
}
