import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
baseUrl : string ="http://localhost:3000/users";

  constructor(private http : HttpClient) { }

  getData(){
   return this.http.get(this.baseUrl, {observe : "response"});
  }
  updateUser(id : number, requestBody : any){
    const url = `${this.baseUrl}/${id}`;
    return this.http.patch(url, requestBody);
  }
}
