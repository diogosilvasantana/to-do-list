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
  public getList(idCategory: string): Observable<ListModel[]> {
    return this.http.get<ListModel[]>(`${API}/categories/${idCategory}/lists`)
  }

  // BUSCAR POR ID
  public getListById(idCategory: string, idList: string): Observable<ListModel> {
    return this.http.get<ListModel>(`${API}/categories/${idCategory}/lists/${idList}`)
  }

  // INSERIR NOVA CATEGORIA 
  public postList(idCategory: string, data): Observable<ListModel>{
    return this.http.post<ListModel>(`${API}/categories/${idCategory}/lists`, data)
  }

  // ATUALIZAR CATEGORIA
  public updateList(idCategory: string, idList: string, data): Observable<ListModel>{
    return this.http.put<ListModel>(`${API}/categories/${idCategory}/lists/${idList}`, data)
  }

  // EXCLUIR CATEGORIA
  public deleteList(idCategory: string, idList: string): Observable<ListModel>{
    return this.http.delete<ListModel>(`${API}/categories/${idCategory}/lists/${idList}`)
  }

}
