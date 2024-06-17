import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  role:any
  showHeader: boolean = true;
  constructor(public router: Router) {
    // Souscrivez aux changements d'URL pour décider si le header doit être affiché ou non
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Obtenez l'URL actuelle
        const currentUrl = event.url;
        // Vérifiez si l'URL est égale à "/login"
        this.showHeader = !currentUrl.includes('/login');
      }
    });
  }

  ngOnInit(): void {
   
  }


  isLoggedIn() {
    const token = sessionStorage.getItem('connectedUser');
    if (token) {
      const decoded = jwtDecode(token)
      if (decoded) {
            // @ts-ignore: Unreachable code error
            this.role=decoded.user.role                    
      }
    
    }    
    return !!token;
  }


  logout(){
    sessionStorage.removeItem('connectedUser')
  }

  isLoginOrSignupPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/signup' || this.router.url === '/table-projects' || this.router.url === '/table-clients';
  }

  


}
