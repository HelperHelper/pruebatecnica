import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "src/app/models/User/user";
import { UserService } from "src/app/services/user.service";
import { Tarea } from "src/app/models/tarea/tarea";
import { TareaService } from "src/app/services/tarea.service";

@Component({
  selector: 'app-tarea-detail',
  templateUrl: './tarea-detail.component.html',
  styleUrls: ['./tarea-detail.component.scss'],
  providers: [UserService, TareaService]
})
export class TareaDetailComponent implements OnInit {
  public title: string;
  public tareas:  Array<Tarea> = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _tareaService: TareaService
){
    this.title = 'Detalle Tareas por Estados';
    
}

  ngOnInit(){
   
    this.getTarea();

  }

  getTarea(){
     this._route.params.subscribe(
      params => {
          let Estado = params['Estado'];

          this._tareaService.geTareaEstado(Estado).subscribe(
            response =>{
                this.tareas = response.tareas;
                
       
            },
            error => {
                  console.log(<any>error);
            }
          );
      });
  }

}
