import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  addClientForm !: FormGroup
  client: any = {}
  id: any
  title: string = "Ajouter client"
  msg:string=""
  constructor(private router: Router, private activatedRoute: ActivatedRoute , private cService: ClientsService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    if (this.id !== null) {
      this.title = "Modifier client"
      this.getClientById()
    }
  }
  addEditClient() {
   
    if (this.id) {
      // rani fel edit
      this.cService.updateClient(this.client).subscribe((rst)=>{

        this.msg=rst.message

        this.router.navigate(['table-clients'])
      })
    } else {
      // here into add
      this.cService.addClient(this.client).subscribe((rst)=>{

        
        this.msg=rst.message

        this.router.navigate(['table-clients'])
      })
    }

  }


  getClientById() {
    this.cService.getClientById(this.id).subscribe((res)=>{
      this.client= res.client
    })
  }


}
