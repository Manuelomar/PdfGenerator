import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse, PagedResponse } from '../responses/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  protected baseURL!: string;

  constructor(protected http: HttpClient) {
    this.initializeBaseURL('baseApiUrl');
  }

  initializeBaseURL(baseApiUrlKey: keyof typeof environment): void {
    const value = environment[baseApiUrlKey];
    if (typeof value === 'string') {
      this.baseURL = value;
    } else {
      throw new Error(`El valor para ${String(baseApiUrlKey)} no es una cadena.`);
    }
  }

  getAll(pageSize: number = 10, pageNumber?: number): Observable<PagedResponse<T>> {
    let params = new HttpParams().set('PageSize', pageSize.toString());
    if (pageNumber) {
      params = params.set('PageNumber', pageNumber.toString());
    }

    return this.http.get<ApiResponse<PagedResponse<T>>>(this.baseURL, { params })
      .pipe(
        map(response => response.data)
      );
  }

  get(id: number): Observable<T> {
    return this.http.get<ApiResponse<T>>(`${this.baseURL}/${id}`)
      .pipe(
        map(response => response.data)
      );
  }

  add(item: T): Observable<T> {
    return this.http.post<ApiResponse<T>>(this.baseURL, item)
      .pipe(
        map(response => response.data)
      );
  }

  update(id: number, item: T): Observable<T> {
    return this.http.put<ApiResponse<T>>(`${this.baseURL}/${id}`, item)
      .pipe(
        map(response => response.data)
      );
  }

  delete(id: number): Observable<T> {
    return this.http.delete<ApiResponse<T>>(`${this.baseURL}/${id}`)
      .pipe(
        map(response => response.data)
      );
  }
}
