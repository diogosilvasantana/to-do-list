import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriesModel } from './models/categories';
import { CategoriesService } from './services/categories.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public categories: CategoriesModel[];
  public categoria: CategoriesModel

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.getCategories()

  }

  public getCategories(): void {
    this.categoriesService.getCategories().subscribe(result => {
      this.categories = result;
    })
  }

  public novaCategoria(): void {
    this.categoriesService.postCategories(this.categoria).subscribe(result => {
      console.log(result)
    })
  }

  public atualizarCategoria(id, data): void{
    this.categoriesService.updateCategories(id, data).subscribe()
  }



}
