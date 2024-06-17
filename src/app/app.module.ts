import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProjectInfoComponent } from './components/project-info/project-info.component';
import { MyFilterPipe } from './pipes/my-filter.pipe';
import { TableProjectsComponent } from './components/table-projects/table-projects.component';
import { SmartTableComponent } from './components/smart-table/smart-table.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { TableClientsComponent } from './components/table-clients/table-clients.component';
import { ClientInfoComponent } from './components/client-info/client-info.component';
import { MyFilterClientPipe } from './pipes/my-filter-client.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AddProjectComponent,
    LoginComponent,
    SignupComponent,
    ProjectInfoComponent,
    MyFilterPipe,
    TableProjectsComponent,
    AddClientComponent,
    TableClientsComponent,
    ClientInfoComponent,
    MyFilterClientPipe,
    // SmartTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, //TDF
    ReactiveFormsModule, //RF
    HttpClientModule,
    BrowserAnimationsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
