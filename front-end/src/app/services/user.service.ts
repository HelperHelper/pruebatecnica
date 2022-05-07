import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import {User} from '../models/User/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string;
  public identity: any;
  public token: any;

  constructor(
    public _http: HttpClient
  ){
    this.url = Global.url;
   }

  
  register(user:any):Observable<any>{
    let json = JSON.stringify(user);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.post(this.url+'users', params, {headers: headers});
    
  }

  singup(user:any, gettoken = null ):Observable<any>{
    if(gettoken != null){
        user.gettoken = 'true';
    }
    let json = JSON.stringify(user);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.post(this.url+'login', params, {headers: headers});

  }

  getIdentity(){
    let identity = JSON.parse(<any>localStorage.getItem('identity'));

    if(identity != "undefined"){
       this.identity = identity;
    }else{
      this.identity = null;
    }
    return this.identity;

  }

  getToken(){
    let token = localStorage.getItem('token');

    if(token != "undefined"){
      this.token = token;
   }else{
     this.token = null;
   }
   return this.token;

  }
} 
