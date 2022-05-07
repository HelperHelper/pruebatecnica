import {Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { User } from 'src/app/models/User/user';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [UserService]
})
export class LoginComponent implements OnInit{
    public title: string;
   public user: User;
    public token: any;
    public identity: any;
    public status: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Identificate';
       this.user = new User(1,'', 'a3ficiona1do','',3456765,'','');
       this.status = '';
    }


    ngOnInit(){
        console.log('login.component cargado correctamente');
        this.logout();
        
    }

    onSubmit(form: any){
       // console.log(this.user);

        this._userService.singup(this.user).subscribe(
            response => {
                // Token
                if(response.status != 'error'){
                    this.status = 'success';
                this.token = response;
                localStorage.setItem('token', this.token);

                //Objeto Usuario identificado
                this._userService.singup(this.user, <any>true).subscribe(
                    response => {
                        // Token
                    this.identity = response;
                    localStorage.setItem('identity', JSON.stringify(this.identity));

                    // redirección
                    this._router.navigate(['home']);
        
                    //Objeto Usuario identificado
                    },
                    error => {
                        console.log(<any>error);
                    }
                );
             } else {
                 this.status = 'error';
             }
            },
            error => {
                console.log(<any>error);
            }
        );

    }

    logout(){
        this._route.params.subscribe(params =>{
            let logout = +params['sure'];

            if(logout == 1){
                localStorage.removeItem('identity');
                localStorage.removeItem('token');

                this.identity = null;
                this.token = null;

                //redirección
                
                this._router.navigate(['home']);

            }

        });
    }

}