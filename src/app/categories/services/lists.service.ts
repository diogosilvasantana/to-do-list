import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ListModel } from '../models/list'

import { API } from '../../api/app.api';

@Injectable({
  providedIn: 'root'
})

export class ListService {

  constructor(private http: HttpClient) { }

  // LISTAR
  public getList(id: string): Observable<ListModel[]> {
    return this.http.get<ListModel[]>(`${API}/categories/${id}/lists`)
  }

  // BUSCAR POR ID
  public getListById(id: String): Observable<ListModel> {
    return this.http.get<ListModel>(`${API}/categories/${id}`)
  }

  // INSERIR NOVA CATEGORIA 
  public postList(data): Observable<ListModel>{
    return this.http.post<ListModel>(`${API}/categories`, data)
  }

  // ATUALIZAR CATEGORIA
  public updateList(id, data): Observable<ListModel>{
    return this.http.put<ListModel>(`${API}/categories/${id}`, data)
  }

  // EXCLUIR CATEGORIA
  public deleteList(id): Observable<ListModel>{
    return this.http.delete<ListModel>(`${API}/categories/${id}`)
  }

}
