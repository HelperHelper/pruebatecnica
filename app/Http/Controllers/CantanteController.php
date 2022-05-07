<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Helpers\JwtAuth;
use App\Models\cantante;

class CantanteController extends Controller
{
    public function index(Request $request){
        
        $cantantes  = Cantante::all();
        return response()->json(array(
            'cantantes' => $cantantes,
            'Status' => 'success'

        ), 200);
    }

    public function show($id){
        $cantante = cantante::find($id);
        return response()->json(array(
            'Cantante' => $cantante,
            'Status' => 'success'

        ), 200);
    }

    public function store(Request $request){

        $hash = $request->header('Authorization', null);
        
        $jwtAuth = new JwtAuth();

        $checkToken = $jwtAuth->checkToken($hash);

        if($checkToken){
            //Recoger datos por post
            $json = $request->input('json', null);
            $params = json_decode($json);
            $params_array = json_decode($json,true);

            // Conseguir el usuario identificado
            $user = $jwtAuth->checkToken($hash, true);

            //validación
                    $validate= \Validator::make($params_array, [
                    'nombre' => 'required|min:6',
                    'fechaNacimiento' => 'required',
                    'biografia' => 'required|min:10',
                    'foto' => 'required|mimes:jpg,jpeg,bmp,png|max:3000',
                    'genero' => 'required|max:2'
    
                ]);

                if($validate->fails()){
                    return response()->json($validate->errors(), 400);
                }
           

            // Guardar el cantante
            $cantante = new Cantante();

            $cantante->user_id = $user->sub;
            $cantante->nombre = $params->nombre;
            $cantante->fechaNacimiento = $params->fechaNacimiento;
            $cantante->biografia = $params->biografia;
            $cantante->foto = $params->foto;
            $cantante->genero = $params->genero;

            $cantante->save();

            $data = array(
                'cantante' => $cantante,
                'status' => 'success',
                'code' => 200


            );

           
        } else {

            // Devolver Error
            $data = array(
                'message' => 'Login incorrecto',
                'status' => 'error',
                'code' => 400


            );

        }
    
        return response()->json($data,200);

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


                'nombre' => 'required|min:6',
                'fechaNacimiento' => 'required',
                'biografia' => 'required|min:10',
                //'foto' => 'required|mimes:jpg,jpeg,bmp,png|max:3000',
                'genero' => 'required|max:2'

            ]);

            if($validate->fails()){
                return response()->json($validate->errors(), 400);
            }
             
            //Actualizar el registro 
            $cantante = cantante::where('id', $id)->update($params_array);

            $data = array(
              'cantante' => $params,
              'status' => 'success',
              'code' => 200
            );


           }else{
               //Devolver error
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'cantante no existe, revisar datos'
                );
            }
    
            
    
            return response()->json($data, 200);
    }

    public function destroy($id, Request $request){
        $hash = $request->header('Authorization', null);
        
        $JwrAuth = new JwtAuth();
        $checkToken = $JwrAuth->checkToken($hash);


        if($checkToken){ 
            
            //Comprobar que existe el registro de cantante

            $cantante = cantante::find($id); 


            //borrarlo
            $cantante->delete();

            //devolver el registro borrado
            $data = array(
                'cantante' => $cantante,
                'status' => 'success',
                'code' => 200
            );

        }else {
            $data = array(
                'status' => 'error',
                'code' => 400,
                'message' => 'Login incorrecto'
            );
        }

        return response()->json($data,200);

    }


}
