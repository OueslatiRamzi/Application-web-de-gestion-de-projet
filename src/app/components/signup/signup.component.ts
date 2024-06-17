import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { MustMatch } from 'src/app/shared/matching';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup
  msg:string=""

  constructor(private router:Router,private fb: FormBuilder, private userService: UsersService) { }

  ngOnInit(): void {
    console.log(window.location);


    this.signupForm = this.fb.group({
      firstName: ['', [Validators.minLength(3), Validators.required]],
      lastName: ['', [Validators.minLength(3), Validators.required]],
      email: ['', [Validators.email, , Validators.required]],
      password: ['', [Validators.required]],
      cPassword: [''],
      role: [window.location.pathname === "/signupAdminDomovit" ? 'admin' : 'user'   ],
    }, {
      validators: MustMatch('password', 'cPassword')
    })
  }


  signup() {
    this.userService.signUp(this.signupForm.value).subscribe(
      (res) => {
        if (res.message === 'user added') {
          this.msg="Agent ajouté avec succès"
        }
      },
      (error) => {
        // Afficher un message d'erreur à l'utilisateur
        this.msg=error.message="Email existe"
      }
    );
  }
  
}
