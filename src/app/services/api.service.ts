import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private loadingAction="Loading..."
  setAction(loadingAction:any){
    this.loadingAction=loadingAction
  }
  getAction(){
    return this.loadingAction
  }
  constructor(private http:HttpClient) { }

  getAllUsers():Observable<any>{
    return this.http.get('https://back-end-five-tawny.vercel.app/api/getUser')
  }
  addUser(userFrom:any):Observable<any>{
    return this.http.post('https://back-end-five-tawny.vercel.app/api/addUser',userFrom)
  }
  getUserDetails(id:any):Observable<any>{
    return this.http.get(`https://back-end-five-tawny.vercel.app/api/getUser/${id}`)
  }
  updateUser(id:any,userFrom:any):Observable<any>{
     return this.http.put(`https://back-end-five-tawny.vercel.app/api/updateUser/${id}`,userFrom)
  }
  deleteUser(id:any):Observable<any>{
    return this.http.delete(`https://back-end-five-tawny.vercel.app/api/deleteUser/${id}`)
  }
}
