<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Helpers\JwtAuth;
use App\Models\tarea;

class TareaController extends Controller
{
    public function index(){

        /*
        4. El usuario podrá visualizar un reporte de la cantidad de tareas por cada
estado:
- TOTAL INICIADAS
- TOTAL EN PROCESO
- TOTAL CANCELADAS
- TOTAL COMPLETADAS
*/
        
        $tareas  = tarea::all();
        return response()->json(array(
            'tareas' => $tareas,
            'Status' => 'success'
    
        ), 200);
        
      
        //$usuario = $tareas->load('user');
      
    }

    public function show($estado){
       // $tarea = tarea::find($id);
       $tareas = new tarea();
       $tareas = tarea::where('Estado','like','%'.$estado.'%')->get();
        return response()->json(array(
            'tareas' => $tareas,
            'Status' => 'success'

        ), 200);
    }

    public function search($id){
            
        $tarea = tarea::find($id);

        //$tareas->Estado = $params->Estado;
      
        //$tarea = tarea::where('Estado', $params->Estado)->get();
        //$tareas = tarea::where('Estado','=',$params->Estado)->get();
        //$tareas = tarea::where('Estado','=',$Estado)->get();
        return response()->json(array(
            'tarea' => $tarea,
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
                    'Nombre' => 'required',
                    'Estado' => 'required'

                ]);
                

                if($validate->fails()){
                    return response()->json($validate->errors(), 400);
                }
           

            // Guardar la tarea
            $tarea = new tarea();

            $tarea->user_id = $user->sub;
            $tarea->Nombre = $params->Nombre;
            $tarea->Estado = $params->Estado;
            $tarea->created_at = $params->created_at;
            $tarea->updated_at = $params->updated_at;

            $tarea->save();

            $data = array(
                'tarea' => $tarea,
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

                'Nombre' => 'required',
                'Estado' => 'required',     

            ]);

            if($validate->fails()){
                return response()->json($validate->errors(), 400);
            }
             
            //Actualizar el registro 
            $tarea = tarea::where('id', $id)->update($params_array);

            $data = array(
              'tarea' => $params,
              'status' => 'success',
              'code' => 200
            );


           }else{
               //Devolver error
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'tarea no existe, revisar datos'
                );
            }
    
            
    
            return response()->json($data, 200);
    }

    public function destroy($id, Request $request){
        $hash = $request->header('Authorization', null);
        
        $JwrAuth = new JwtAuth();
        $checkToken = $JwrAuth->checkToken($hash);


        if($checkToken){ 
            
            //Comprobar que existe el registro de tarea

            $tarea = tarea::find($id); 


            //borrarlo
            $tarea->delete();

            //devolver el registro borrado
            $data = array(
                'tarea' => $tarea,
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
