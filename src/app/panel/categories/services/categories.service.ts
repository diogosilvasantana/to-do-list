import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { CategoriesModel } from '../models/categories'

import { API } from '../../../api/app.api';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  constructor(private http: HttpClient) { }

  // LISTAR CATEGORIAS
  public getCategories(): Observable<CategoriesModel[]> {
    return this.http.get<CategoriesModel[]>(`${API}/categories`)
  }

  // BUSCAR CATEGORIA POR ID
  public getCategoriesById(id: String): Observable<CategoriesModel> {
    return this.http.get<CategoriesModel>(`${API}/categories/${id}`)
  }

  // INSERIR NOVA CATEGORIA 
  public postCategories(data): Observable<CategoriesModel>{
    return this.http.post<CategoriesModel>(`${API}/categories`, data)
  }

  // ATUALIZAR CATEGORIA
  public updateCategories(id, data): Observable<CategoriesModel>{
    return this.http.put<CategoriesModel>(`${API}/categories/${id}`, data)
  }

  // EXCLUIR CATEGORIA
  public deleteCategories(id): Observable<CategoriesModel>{
    return this.http.delete<CategoriesModel>(`${API}/categories/${id}`)
  }

}
