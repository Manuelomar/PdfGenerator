import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateService } from 'src/app/services/template.service';
import { Template } from 'src/app/models/template.model';

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.css']
})
export class AddTemplateComponent implements OnInit {
  addTemplateRequest: Template = {
    id: '',
    name: '',
    fields: [
      {
        destinationName: '',
        skills: '',
        relevantAreas: '',
        from: '',
        desiredPosition: '',
        createdDate: ''
      }
    ],
    createdAt: '',
    updatedAt: ''
  };

  constructor(
    private templateService: TemplateService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  addTemplate(): void {
    this.templateService.addTemplate(this.addTemplateRequest)
      .subscribe({
        next: (template) => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('There was an error adding the template', error);
        }
      });
  }
}
