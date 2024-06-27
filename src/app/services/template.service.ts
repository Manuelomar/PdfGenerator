import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Template } from '../models/template.model';
import { Observable } from 'rxjs';
import { PagedResponse } from '../responses/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class TemplateService extends BaseService<Template> {

  constructor(http: HttpClient) {
    super(http);
    this.initializeBaseURL('baseApiUrl');
    this.baseURL = `${this.baseURL}/Template`;
  }

  getTemplates(pageNumber: number, pageSize: number = 10): Observable<PagedResponse<Template>> {
    return this.getAll(pageSize, pageNumber);
  }
}
