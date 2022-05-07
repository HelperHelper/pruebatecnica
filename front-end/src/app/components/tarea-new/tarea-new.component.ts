import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from 'src/app/services/user.service';
import { TareaService } from 'src/app/services/tarea.service';
import { Tarea } from 'src/app/models/tarea/tarea';

@Component({
  selector: 'app-tarea-new',
  templateUrl: './tarea-new.component.html',
  styleUrls: ['./tarea-new.component.scss'],
  providers: [UserService, TareaService]
})
export class TareaNewComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public tarea: Tarea;
  public status_tarea!: string;
  public editable: boolean = true;  


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _tareaService: TareaService
  ) {
    this.page_title = 'Crear Nueva Tarea';
    this.tarea = new Tarea(1, '', '', null, null);
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit(){
    if(this.identity == null){
      this._router.navigate(["/login"]);
    } else {

      // Crear Objeto Tarea
      this.tarea = new Tarea(1, '', '', null, null);


    }
  }

  onSubmit(form: { reset: () => void; }){

 /*
    console.log(this.tarea);
    console.log(this._tareaService.pruebas());
    if(this.tarea.Estado == 'COMPLETADA'){
      this.tarea.Estado = 'disabled';
    }
    */

    this._tareaService.create(this.token, this.tarea).subscribe(
          response => {
                 console.log(response);
                 if(response.status == 'success'){
                   this.tarea = response.tarea;
                   this.status_tarea = 'success';
                   this._router.navigate(['/home']);
                 //  form.reset();
               }else {
                   this.status_tarea = 'error';
               }

                
          },
          error =>{
             console.log(<any>error);
             this.status_tarea = 'error';
          }

    );

  }

}
