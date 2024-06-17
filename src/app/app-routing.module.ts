import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ProjectInfoComponent } from './components/project-info/project-info.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { TableProjectsComponent } from './components/table-projects/table-projects.component';
import { SmartTableComponent } from './components/smart-table/smart-table.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { TableClientsComponent } from './components/table-clients/table-clients.component';
import { ClientInfoComponent } from './components/client-info/client-info.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "add-project", component: AddProjectComponent },// http://localhost:4200/add-projects
  { path: "edit-project/:id", component: AddProjectComponent },
  { path: "table-projects", component: TableProjectsComponent },// http://localhost:4200/table-projects
  { path: "table-clients", component: TableClientsComponent },// http://localhost:4200/table-clients
  { path: "project-info/:id", component: ProjectInfoComponent },// http://localhost:4200/project-info
  { path: "client-info/:id", component: ClientInfoComponent },// http://localhost:4200/client-info
  { path: "signup", component: SignupComponent },// http://localhost:4200/signup
  { path: "signupAdminDomovit", component: SignupComponent },
  { path: "login", component: LoginComponent },// http://localhost:4200/login
  { path: "smartTable", component: SmartTableComponent },// http://localhost:4200/smartTable
  { path: "add-client", component: AddClientComponent },
  { path: "edit-client/:id", component: AddClientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
