import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  addUser( data: any) : Observable<any>{
    return this.http.post("http://localhost:3000/userData", data);
  }
  editUser(id:any, data: any) : Observable<any>{
    return this.http.put(`http://localhost:3000/userData/${id}`, data);
  }

  getUser(): Observable<any>{
    return this.http.get("http://localhost:3000/userData");
  }

  deleteUser(id:any): Observable<any>{
    return this.http.delete(`http://localhost:3000/userData/${id}`)
  }
}
