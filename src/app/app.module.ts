import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesListsComponent } from './categories/components/categories-lists/categories-lists.component';
import { ListItemsComponent } from './categories/components/categories-lists/list-items/list-items.component';
import { CategoriesGridComponent } from './categories/components/categories-grid/categories-grid.component';
import { CategoriesListsGridComponent } from './categories/components/categories-lists/categories-lists-grid/categories-lists-grid.component';
import { ListItemsGridComponent } from './categories/components/categories-lists/list-items/list-items-grid/list-items-grid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';



@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    CategoriesListsComponent,
    ListItemsComponent,
    CategoriesGridComponent,
    CategoriesListsGridComponent,
    ListItemsGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
