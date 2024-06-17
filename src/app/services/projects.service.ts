import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  projectUrl = "http://localhost:3000/projects";

  constructor(private httpClient: HttpClient) { }

  addProject(data: any, images: FileList) {
    const formData = new FormData();

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        formData.append(`images`, images[i]);
      }
    }
    console.log("here into service", images);
    
    formData.append('name',data.name)
    formData.append('produits',data.produits)
    formData.append('promotion',data.promotion)
    formData.append('contactPromoteur',data.contactPromoteur)
    formData.append('zone',data.zone)
    formData.append('bureauDetude',data.bureauDetude)
    formData.append('installateur',data.installateur)
    formData.append('contactInstallateur',data.contactInstallateur)
    formData.append('avancement',data.avancement)
    formData.append('dateVisite',data.dateVisite)
    formData.append('remarque',data.remarque)
    

    return this.httpClient.post<{ message: any }>(this.projectUrl,formData)
  }

  getAllProjects() {
    return this.httpClient.get<{ projects: any }>(this.projectUrl)
  }

  deleteProject(id: any) {
    return this.httpClient.delete<{ message: any }>(`${this.projectUrl}/${id}`)
  }

  getProjectById(id: any) {
    return this.httpClient.get<{ project: any }>(`${this.projectUrl}/${id}`)
  }
  updateProject(data: any) {
    return this.httpClient.put<{ message: any }>(this.projectUrl, data)
  }
}
