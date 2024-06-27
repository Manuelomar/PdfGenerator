import { Component, OnInit } from '@angular/core';
import { Template } from 'src/app/models/template.model';
import { PagedResponse } from 'src/app/responses/ApiResponse';
import { TemplateService } from 'src/app/services/template.service';
import { PdfGeneratorService } from 'src/app/services/pdf-generator.service';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {
  templates: Template[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  totalRecords: number = 0;

  constructor(
    private templateService: TemplateService,
    private pdfGeneratorService: PdfGeneratorService
  ) { }

  ngOnInit(): void {
    this.loadTemplates();
  }

  loadTemplates(): void {
    this.templateService.getTemplates(this.pageNumber, this.pageSize).subscribe({
      next: (response: PagedResponse<Template>) => {
        this.templates = response.items;
        this.pageNumber = response.pageNumber;
        this.pageSize = response.pageSize;
        this.totalPages = response.totalPages;
        this.totalRecords = response.totalRecords;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  downloadPdf(templateId: string): void {
    this.pdfGeneratorService.generatePdf(templateId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${templateId}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 
      error: (err) => {
        console.error('Error downloading PDF', err);
      }
    });
  }
}
