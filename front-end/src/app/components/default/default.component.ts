import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "src/app/models/User/user";
import { UserService } from "src/app/services/user.service";
import { Tarea } from "src/app/models/tarea/tarea";
import { TareaService } from "src/app/services/tarea.service";

@Component({
    selector: 'default',
    templateUrl: './default.component.html',
    providers: [UserService, TareaService]
})
export class DefaultComponent implements OnInit{
    public title: string;
    public tareas: Array<Tarea> = [];
    public token;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _tareaService: TareaService
    ){
        this.title = 'Inicio';
        this.token = this._userService.getToken();
        
    }

    ngOnInit(){
        console.log('default.component cargado correctamente');
        this._tareaService.getTareas().subscribe(
            response => {
                this.tareas = response.tareas;
        
               // console.log(response.status == 'success');
            },
            error => {
                console.log(error);
            }
        );
        
    }

    deleteTarea(id:any){
        this._tareaService.delete(this.token, id).subscribe(
            response => {
                this._router.navigate(['home']);
            },
            error => {
                console.log(<any>error);
            }
        )

    }


}