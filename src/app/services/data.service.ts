import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignIn, SingUp } from '../models/user.model';
import { Banner } from '../models/banner.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'http://localhost:3000';
  
  constructor(private http: HttpClient) { }

 
  fetchBanners(): Observable<Banner[]> {
    return this.http.get<Banner[]>(`${this.apiUrl}/banners`);
  }


  signIn(singInData: SignIn): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, singInData);
  }

  signUp(signUpData: SingUp): Observable<any> {
    console.log("Finalk data is ", signUpData)
    return this.http.post(`${this.apiUrl}/signup`, signUpData);
  }
}
