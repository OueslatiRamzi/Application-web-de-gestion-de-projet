import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent implements OnInit {

  id:any
  images : any= []
  client:any={}

  constructor(private activatedRoute:ActivatedRoute, private cServices:ClientsService) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.paramMap.get('id')

    this.getClientById()
    
  }

  getClientById(){
    this.cServices.getClientById(this.id).subscribe((res)=>{
      this.client=res.client
    })

  }

}
