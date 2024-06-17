import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:any={}
  loginForm !: FormGroup
  msg:string=""
  constructor(private router:Router, private userService:UsersService) { }

  ngOnInit(): void {
  }
  login(){

    this.userService.login(this.user).subscribe((res)=>{
      console.log(res);

      if (res.message==="2") {
        sessionStorage.setItem('connectedUser',res.user)
        this.router.navigate(['/'])
      } else if (res.message === "1") {
        // Mot de passe incorrect
        this.msg="Mot de passe incorrect"
      } else if (res.message === "0") {
        // Utilisateur introuvable
        this.msg="Utilisateur introuvable"
      }
      

      
    })

  }

}
