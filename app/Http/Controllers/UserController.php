<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class UserController extends Controller
{

    public function index(Request $request){
        $users  = User::all();
        return response()->json(array(
            'Users' => $users,
            'Status' => 'success'

        ), 200);
    }     

    public function show($id){
        $user = User::find($id);
        return response()->json(array(
            'User' => $user,
            'Status' => 'success'

        ), 200);
    }


    public function store(Request $request){
        //Recoger datos por post
        $json = $request->input('json', null);

      if(!is_null($json)){
        $params = json_decode($json);
        $params_array = json_decode($json,true);

     //validación
     $validate= \Validator::make($params_array, [
        'password' => 'min:6'
    ]);


    if($validate->fails()){
        return response()->json($validate->errors(), 400);
    }
        
        $Nombre = isset($params->Nombre) ? $params->Nombre : null;
        $Usuario = isset($params->Usuario) ? $params->Usuario : null;
        $Telefono = isset($params->Telefono) ? $params->Telefono : null;
        $Direccion = isset($params->Direccion) ? $params->Direccion : null;
        $email = isset($params->email) ? $params->email : null;
        $password = isset($params->password) ? $params->password : null;        

          // Crear Usuario
          $user = new User();

          $user->Nombre = $Nombre;
          $user->Usuario = $Usuario;
          $user->Telefono = $Telefono;
          $user->Direccion = $Direccion;
          $user->email = $email;

          $pwd = hash('sha256', $password);
          $user->password = $pwd;

       
          //Comprobar usuario 
          $isset_user = User::Where('email', '=', $email)->first();
          if ($isset_user == null){

            $user->save(); 

            $data = array(
                'status' => 'success',
                'code' => 200,
                'message' => 'Usuario registrado correctamente!!'
            );

          } else {

            $data = array(
                'status' => 'error',
                'code' => 400,
                'message' => 'Usuario duplicado, no puede registrarse'
            );
            
          }

        } else {
            $data = array(
                'status' => 'error',
                'code' => 400,
                'message' => 'Usuario no creado, revisar datos'
            );
        }

        

        return response()->json($data, 200);

    }

    public function login(Request $request){
        
        $jwtAuth = new JwtAuth();

        //Recibir datos por post

        $json = $request->input('json', null);
        $params = json_decode($json);

        $email = (!is_null($json) && isset($params->email)) ? $params->email : null;
        $password = (!is_null($json) && isset($params->password)) ? $params->password : null;
        $getToken = (!is_null($json) && isset($params->gettoken)) ? $params->gettoken : null;



        //Cifrar la password 
        $pwd = hash('sha256', $password);

        if(!is_null($email) && !is_null($password) && ($getToken == null || $getToken == 'false')){
            $signup = $jwtAuth->signup($email, $pwd);

        } elseif($getToken != null){
            //var_dump($getToken); die();
            $signup = $jwtAuth->signup($email, $pwd, $getToken);

        }else {
           
            $signup = array(
                'status' => 'error',
                'message' => 'Envia tus datos por post'
            );

        }

        return response()->json($signup, 200);

    }


    public function update($id, Request $request){
        $hash= $request->header('Authorization', null);

        $JwrAuth = new JwtAuth();
        $checkToken = $JwrAuth->checkToken($hash);

        if($checkToken){
            //recoger parametros post
            $json = $request->input('json', null);
            $params = json_decode($json);
            $params_array = json_decode($json, true);


            //validar datos 
            $validate = \Validator::make($params_array, [

               // 'email'=> 'unique:users',
                'email' => 'required',
                'Usuario' => 'required',
                'Nombre'  => 'required',
                'password' => 'required|min:6'

            ]);

            if($validate->fails()){
                return response()->json($validate->errors(), 400);
            }
             
            //Actualizar el registro 
            $user = User::where('id', $id)->update($params_array);

            $data = array(
              'user' => $params,
              'status' => 'success',
              'code' => 200
            );


           }else{
               //Devolver error
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'Usuario no existe, revisar datos'
                );
            }
    
            
    
            return response()->json($data, 200);
    }

}
