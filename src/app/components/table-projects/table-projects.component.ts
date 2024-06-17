import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-table-projects',
  templateUrl: './table-projects.component.html',
  styleUrls: ['./table-projects.component.css']
})
export class TableProjectsComponent implements OnInit {
  term : any
  projects: any = []
  id:any

  constructor(private router:Router, private pService: ProjectsService) { }

  ngOnInit(): void {
    this.getAllProjects()
  }

  getAllProjects() {
    this.pService.getAllProjects().subscribe((rst) => {
      
      
      this.projects = rst.projects
    })
  }
  confirmDelete(projectId: string) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      this.deleteProject(projectId);
    } else {
      // L'utilisateur a annulé la suppression, ne rien faire
    }
  }
  deleteProject(id: any) {
    this.pService.deleteProject(id).subscribe((res)=>{
      console.log(res.message);
      this.getAllProjects()
      
    })
  }
  
  navigateTo(id: any, path: any) {

    this.router.navigate([path + id])
  }

}
