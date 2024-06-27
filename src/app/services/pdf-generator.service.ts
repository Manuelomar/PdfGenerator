import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  private baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = `${environment.baseApiUrl}/PdfGenerator`;
  }

  generatePdf(templateId: string): Observable<Blob> {
    return this.http.post<{ pdf: string }>(`${this.baseURL}/generate-pdf/${templateId}`, {}, { responseType: 'json' })
      .pipe(
        map((response) => {
          const base64 = response.pdf;
          const cleanedBase64 = this.cleanBase64String(base64);
          console.log('Cleaned Base64 Response:', cleanedBase64);
          return this.base64ToBlob(cleanedBase64, 'application/pdf');
        })
      );
  }

  private cleanBase64String(base64: string): string {
    let cleanedBase64 = base64.replace(/[^A-Za-z0-9+/=]/g, '');
    while (cleanedBase64.length % 4 !== 0) {
      cleanedBase64 += '=';
    }
    return cleanedBase64;
  }

  private base64ToBlob(base64: string, contentType: string): Blob {
    try {
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: contentType });
    } catch (error) {
      console.error('Failed to convert base64 to Blob:', error);
      throw error;
    }
  }
}
