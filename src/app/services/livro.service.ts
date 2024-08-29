import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, ILivro } from '../shared/models/Livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  apiurl = 'http://127.0.0.1/api/livros/';
  constructor(private http: HttpClient) {}

  getAllLivro(): Observable<ApiResponse<ILivro[]>> {
    return this.http.get<ApiResponse<ILivro[]>>(`${this.apiurl}`);
  }

  getLivro(id: string): Observable<ApiResponse<ILivro>> {
    return this.http.get<ApiResponse<ILivro>>(`${this.apiurl}/${id}`);
  }

  createLivro(livro: ILivro): Observable<any> {
    return this.http.post(`${this.apiurl}`, livro);
  }

  updateLivro(id: string, livro: ILivro): Observable<any> {
    return this.http.put(`${this.apiurl}/${id}`, livro);
  }

  deleteLivro(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiurl}/${id}`);
  }

}
