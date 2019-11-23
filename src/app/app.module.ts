import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesListsComponent } from './categories/components/categories-lists/categories-lists.component';
import { ListItemsComponent } from './categories/components/categories-lists/list-items/list-items.component';
import { CategoriesGridComponent } from './categories/components/categories-grid/categories-grid.component';
import { CategoriesListsGridComponent } from './categories/components/categories-lists/categories-lists-grid/categories-lists-grid.component';
import { ListItemsGridComponent } from './categories/components/categories-lists/list-items/list-items-grid/list-items-grid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CategoriesFormComponent } from './categories/components/categories-form/categories-form.component';
import { CategoriesConfirmDialogComponent } from './categories/components/categories-confirm-dialog/categories-confirm-dialog.component';
import { CategoriesListsFormComponent } from './categories/components/categories-lists/categories-lists-form/categories-lists-form.component';
import { CategoriesListsConfirmDialogComponent } from './categories/components/categories-lists/categories-lists-confirm-dialog/categories-lists-confirm-dialog.component';
import { ListItemsConfirmDialogComponent } from './categories/components/categories-lists/list-items/list-items-confirm-dialog/list-items-confirm-dialog.component';
import { ListItemsFormComponent } from './categories/components/categories-lists/list-items/list-items-form/list-items-form.component';
import { MatIconModule } from '@angular/material/icon'


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    CategoriesListsComponent,
    ListItemsComponent,
    CategoriesGridComponent,
    CategoriesListsGridComponent,
    ListItemsGridComponent,
    CategoriesFormComponent,
    CategoriesConfirmDialogComponent,
    CategoriesListsFormComponent,
    CategoriesListsConfirmDialogComponent,
    ListItemsConfirmDialogComponent,
    ListItemsFormComponent,
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
    MatPaginatorModule,
    MatIconModule
  ],
  exports: [CategoriesComponent],
  entryComponents: [
    CategoriesFormComponent,
    CategoriesConfirmDialogComponent,
    CategoriesListsConfirmDialogComponent,
    CategoriesListsConfirmDialogComponent,
    CategoriesListsFormComponent,
    ListItemsFormComponent,
    ListItemsConfirmDialogComponent
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
