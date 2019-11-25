import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ItemsModel } from '../models/items'

import { API } from '../../../api/app.api';

@Injectable({
  providedIn: 'root'
})

export class ItemsService {

  constructor(private http: HttpClient) { }

  // LISTAR
  public getItem(idCategory: string, idList: string): Observable<ItemsModel[]> {
    return this.http.get<ItemsModel[]>(`${API}/categories/${idCategory}/lists/${idList}/items`)
  }

  // BUSCAR POR ID
  public getItemById(idCategory: string, idList: string, idItem: string): Observable<ItemsModel> {
    return this.http.get<ItemsModel>(`${API}/categories/${idCategory}/lists/${idList}/items/${idItem}`)
  }

  // INSERIR NOVO ITEM 
  public postItem(idCategory: string, idList: string, data): Observable<ItemsModel>{
    return this.http.post<ItemsModel>(`${API}/categories/${idCategory}/lists/${idList}/items`, data)
  }

  // ATUALIZAR ITEM
  public updateItem(idCategory: string, idList: string, idItem: string, data): Observable<ItemsModel>{
    return this.http.put<ItemsModel>(`${API}/categories/${idCategory}/lists/${idList}/items/${idItem}`, data)
  }

  // EXCLUIR ITEM
  public deleteItem(idCategory: string, idList: string, idItem: string): Observable<ItemsModel>{
    return this.http.delete<ItemsModel>(`${API}/categories/${idCategory}/lists/${idList}/items/${idItem}`)
  }

}
