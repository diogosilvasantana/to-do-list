import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './panel/categories/categories.component';
import { ListsComponent } from './panel/lists/lists.component';
import { ItemsComponent } from './panel/items/items.component';

const routes: Routes = [
  { path: '', component: CategoriesComponent },
  { path: 'categories/:idCategory/lists', component: ListsComponent },
  { path: 'categories/:idCategory/lists/:idList/items', component: ItemsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
