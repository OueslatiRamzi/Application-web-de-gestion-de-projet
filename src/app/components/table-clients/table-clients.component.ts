import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-table-clients',
  templateUrl: './table-clients.component.html',
  styleUrls: ['./table-clients.component.css']
})
export class TableClientsComponent implements OnInit {
  termm : any
  clients: any = []
  id:any
  constructor(private router:Router, private cService: ClientsService) { }

  ngOnInit(): void {
    this.getAllClients()
  }

  getAllClients() {
    this.cService.getAllClients().subscribe((rst) => {
      this.clients = rst.clients
    })
  }

  confirmDelete(clientId: string) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
      this.deleteClient(clientId);
    } else {
      // L'utilisateur a annulé la suppression, ne rien faire
    }
  }

  deleteClient(id: any) {
    this.cService.deleteClient(id).subscribe((res)=>{
      console.log(res.message);
      this.getAllClients()
      
    })
  }
  
  navigateTo(id: any, path: any) {

    this.router.navigate([path + id])
  }

}
