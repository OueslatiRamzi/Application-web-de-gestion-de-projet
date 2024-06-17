import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  clientUrl="http://localhost:3000/clients"

  constructor(private httpClient:HttpClient) { }

  addClient(data:any){
    return this.httpClient.post<{message:any}>(this.clientUrl,data)
  }

  getAllClients(){
    return this.httpClient.get<{clients:any}>(this.clientUrl)
  }

  deleteClient(id:any){
    
    return this.httpClient.delete<{message:any}>(`${this.clientUrl}/${id}`)

  }

  getClientById(id:any){
    return this.httpClient.get<{client:any}>(`${this.clientUrl}/${id}`)

  }

  updateClient(data:any){
    return this.httpClient.put<{message:any}>(this.clientUrl,data)

  }
}
