import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import {Tarea} from '../models/tarea/tarea';


@Injectable({
  providedIn: 'root'
})
export class TareaService {

  public url: string;

  constructor(
    public _http: HttpClient
  ){
    this.url = Global.url;
   }

   pruebas(){
       return "Hola mundo!!";
   }

   create(token:any, tarea:Tarea):Observable<any>{
    let json = JSON.stringify(tarea);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);

    return this._http.post(this.url+'tareas', params, {headers: headers});                            

   }

   getTareas(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
       return this._http.get(this.url+'tareas', {headers: headers}); 
   }

   getTarea(id:any): Observable<any>{
    //let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
       return this._http.get(this.url+'search/' + id); 
   }

   geTareaEstado(Estado:any): Observable<any>{

    return this._http.get(this.url+'tareas/' + Estado);

   }

   update(token:any, tarea:Tarea, id:any): Observable<any>{
     let json = JSON.stringify(tarea);
     let params = 'json='+json;

     let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
     .set('Authorization', token);

     return this._http.put(this.url+'tareas/' + id, params, {headers: headers});

   }

   delete(token:any, id:any): Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
     .set('Authorization', token);


     return this._http.delete(this.url + 'tareas/' + id, {headers: headers});


   }

}