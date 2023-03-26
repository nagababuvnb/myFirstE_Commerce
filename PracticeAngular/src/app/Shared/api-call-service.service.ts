import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiCallServiceService {

  constructor(private http:HttpClient) { }

 
  register(formdata: any){
     return this.http.post("http://localhost:5000/register",formdata);
     }
  
  login(formdata:any){
    return this.http.post("http://localhost:5000/login",formdata);
  }
  gotoMenu(token:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get('http://localhost:5000/menu',{headers:headers})
  }
}
