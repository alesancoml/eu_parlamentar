<?php

include './conexao.php'; 
// header("Access-Control-Allow-Origin:http://localhost:8100");
// header("Content-Type: application/x-www-form-urlencoded");
// header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$m = new Model();

if($m){

    $query = $m->read( 'usuarios');
    $out = "[";
    foreach( $query as $key => $value){
        if ($out != "[") {
            $out .= ",";
        }
        $out .= '{"id": "'.$value["id_usuario"].'",';
        $out .= '"email": "'.$value["email"].'",';
        $out .= '"uf": "'.$value["estado_user"].'"}';
    }
    $out .= "]";
    echo $out;

}   

?>