import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'
import { CategoriesComponent } from './panel/categories/categories.component';
import { CategoriesFormComponent } from './panel/categories/components/categories-form/categories-form.component';
import { CategoriesGridComponent } from './panel/categories/components/categories-grid/categories-grid.component';
import { CategoriesConfirmDialogComponent } from './panel/categories/components/categories-confirm-dialog/categories-confirm-dialog.component';
import { ListsComponent } from './panel/lists/lists.component';
import { ListsConfirmDialogComponent } from './panel/lists/components/lists-confirm-dialog/lists-confirm-dialog.component';
import { ListsFormComponent } from './panel/lists/components/lists-form/lists-form.component';
import { ListsGridComponent } from './panel/lists/components/lists-grid/lists-grid.component';
import { ItemsComponent } from './panel/items/items.component';
import { ItemsConfirmDialogComponent } from './panel/items/components/items-confirm-dialog/items-confirm-dialog.component';
import { ItemsFormComponent } from './panel/items/components/items-form/items-form.component';
import { ItemsGridComponent } from './panel/items/components/items-grid/items-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    CategoriesFormComponent,
    CategoriesGridComponent,
    CategoriesConfirmDialogComponent,
    ListsComponent,
    ListsConfirmDialogComponent,
    ListsFormComponent,
    ListsGridComponent,
    ItemsComponent,
    ItemsConfirmDialogComponent,
    ItemsFormComponent,
    ItemsGridComponent
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
    MatIconModule
  ],
  exports: [CategoriesComponent],
  entryComponents: [
    CategoriesFormComponent,
    CategoriesConfirmDialogComponent,
    ListsConfirmDialogComponent,
    ListsFormComponent,
    ItemsConfirmDialogComponent,
    ItemsFormComponent,
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
