import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ItemsModel } from '../models/items'

import { API } from '../../api/app.api';

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

  // INSERIR NOVA CATEGORIA 
  public postItem(data): Observable<ItemsModel>{
    return this.http.post<ItemsModel>(`${API}/categories`, data)
  }

  // ATUALIZAR CATEGORIA
  public updateItem(id, data): Observable<ItemsModel>{
    return this.http.put<ItemsModel>(`${API}/categories/${id}`, data)
  }

  // EXCLUIR CATEGORIA
  public deleteItem(id): Observable<ItemsModel>{
    return this.http.delete<ItemsModel>(`${API}/categories/${id}`)
  }

}
