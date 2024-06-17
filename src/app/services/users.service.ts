import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userUrl = "http://localhost:3000/users"

  constructor(private httpClient: HttpClient) { }
  login(data: any) {
    return this.httpClient.post<{ message: any , user:any }>(this.userUrl + '/login', data)
  }
  signUp(data: any) {
    return this.httpClient.post<{ message: any }>(this.userUrl, data)
  }
}
