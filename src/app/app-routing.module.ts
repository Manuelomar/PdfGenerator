import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateListComponent } from './components/template-list/template-list.component';
import { EditTemplateComponent } from './components/edit-template/edit-template.component';
import { AddTemplateComponent } from './components/add-template/add-template.component';

const routes: Routes = [
{
  path: '',
  component: TemplateListComponent,
},
{
  path: 'template/edit/:id',
  component: EditTemplateComponent
},
{
  path: 'template/add',
  component: AddTemplateComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
