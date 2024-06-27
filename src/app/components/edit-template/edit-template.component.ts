import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService } from 'src/app/services/template.service';
import { Template } from 'src/app/models/template.model';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.css']
})
export class EditTemplateComponent implements OnInit {
  templateDetails: Template = {
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
    private route: ActivatedRoute,
    private templateService: TemplateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.templateService.getTemplateById(id)
            .subscribe({
              next: (response) => {
                this.templateDetails = response;
                this.templateDetails.id = id;
              },
              error: (error) => {
                console.error('Error fetching template:', error);
              }
            });
        }
      }
    });
  }

  updateTemplate(): void {
    this.templateService.updateTemplate(this.templateDetails.id, this.templateDetails)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error updating template:', error);
        }
      });
  }

  deleteTemplate(): void {
    if (confirm('Are you sure you want to delete this template?')) {
      this.templateService.deleteTemplate(this.templateDetails.id)
        .subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Error deleting template:', error);
          }
        });
    }
  }
}
