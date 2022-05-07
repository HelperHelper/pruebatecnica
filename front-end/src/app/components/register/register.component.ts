import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "src/app/models/User/user";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    providers: [UserService]
})
export class RegisterComponent implements OnInit{
    public title: string;
    public user: User;
    public status: string;
    public registerForm: FormGroup;
    //public huge: BigIntBigInt = 9007199254740991;



    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        public fb: FormBuilder
    ){
        this.title = 'Registrate';
        this.user = new User(1,'', 'a3ficiona1do','',3456765,'','');
        this.status = '';
        this.registerForm = this.fb.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
          });
        
    }

    ngOnInit(){
        console.log('register.component cargado correctamente');
       // registerForm.get('senha').hasError('minLength');
        
    }

    onSubmit(form: { reset: () => void; }){
        // console.log(this.user);

        this._userService.register(this.user).subscribe(
            response => {
               
               if(response.status === 'success'){
                  this.status = response.status;

                   // vaciar el formulario
                   this.user = new User(1,'', 'a3ficiona1do','',3456765,'','');
                   form.reset();
               }else {
                   this.status = 'error';
               }
            },
            error => {
                 console.log(<any>error);
        }
     );  

    }


}