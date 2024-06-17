import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {

  id:any
  images : any= []
  project:any={}

  constructor(private router:Router, private activatedRoute:ActivatedRoute, private pServices:ProjectsService) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.paramMap.get('id')

    this.getProjectById()
    
  }

  getProjectById(){
    this.pServices.getProjectById(this.id).subscribe((res)=>{
      this.project=res.project
    })

  }
  

}
