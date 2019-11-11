import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesListsComponent } from './categories/components/categories-lists/categories-lists.component';
import { ListItemsComponent } from './categories/components/categories-lists/list-items/list-items.component';


const routes: Routes = [
  { path: '', component: CategoriesComponent },
  { path: 'categories/:idCategory/lists', component: CategoriesListsComponent },
  { path: 'categories/:idCategory/lists/:idList/items', component: ListItemsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
