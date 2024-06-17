import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  addProjectForm !: FormGroup
  project: any = {}
  id : any
  title:string="Ajouter projet"
  msg:string=""
  imagePreview=""
  fileImage:any
  images: string[] = [];

  constructor(private router:Router, private activatedRoute:ActivatedRoute, private pServices:ProjectsService) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.paramMap.get('id')
    if(this.id !==null){
      this.title = "Modifier Projet"
      this.getProjectById()
    }
  }
  addEditProject() {
    if (this.id) {
      //rani fel Edit
      this.pServices.updateProject(this.project).subscribe((rst)=>{
        
        this.msg=rst.message
        
        this.router.navigate(['table-projects'])
      })
    }else{
      //rani fel add
      this.pServices.addProject(this.project, this.fileImage).subscribe((rst)=>{
        console.log(rst.message);
        this.msg=rst.message
        
        this.router.navigate(['table-projects'])
      })
    }
  }


  getProjectById(){
    this.pServices.getProjectById(this.id).subscribe((res)=>{
      this.project=res.project
    })
  }

  onImageSelected(event:any){
    const files = event.target.files;
    this.fileImage = files;
    console.log("here fileImage", this.fileImage);
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        this.images.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

}
