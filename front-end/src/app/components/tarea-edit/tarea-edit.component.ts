import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "src/app/models/User/user";
import { UserService } from "src/app/services/user.service";
import { Tarea } from "src/app/models/tarea/tarea";
import { TareaService } from "src/app/services/tarea.service";

@Component({
  selector: 'app-tarea-edit',
  templateUrl: '../tarea-new/tarea-new.component.html',
  styleUrls: ['./tarea-edit.component.scss'],
  providers: [UserService, TareaService]
})
export class TareaEditComponent implements OnInit {
  public page_title: string;
  public tarea!: Tarea;
  public status_tarea!: string;
  public editable: boolean = false;  
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _tareaService: TareaService
){
    this.page_title = 'Detalle Tareas por Estados';
    this.editable = true;
    this.token = this._userService.getToken();
   // this.tarea = new Tarea(1,'', 'INICIADA','','');
    
}

  ngOnInit(){
    this._route.params.subscribe(
      params => {
          let id = +params['id'];
   
    this.getTarea(id);
  });
    //this.editable = true;

  }

  getTarea(id:any){
     

          this._tareaService.getTarea(id).subscribe(
            response =>{
              
             // if(response.status == 'success'){
                this.tarea = response.tarea;
                this.page_title = 'Editar ' + this.tarea.Nombre;
                console.log(this.tarea.Estado);
                if(this.tarea.Estado == 'COMPLETADA'){
                  this.editable = false;
                // console.log('Entro a la validación verificar: ' , this.editable);
                }
              //}else{
               // this._router.navigate(['home']);
             // }
       
            },
            error => {
                  console.log(<any>error);
            }
          );
      
  }

  
  onSubmit(form: { reset: () => void; }){
        //servicio 
    console.log(this.tarea.id);
    this._tareaService.update(this.token, this.tarea, this.tarea.id).subscribe(
        response =>{
            if(response.status == 'success'){
              this.status_tarea = 'success';
              this.tarea = response.tarea;
              this._router.navigate(['/tareas', this.tarea.Estado]);

            } else {
              this.status_tarea = 'error';
            }
        },
        error => {
           console.log(<any>error);
           this.status_tarea = 'error';
        }


    );
  }

}
