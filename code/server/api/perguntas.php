<?php

include './conexao.php'; 
header("Access-Control-Allow-Origin:http://localhost:8100");
header("Content-Type: application/x-www-form-urlencoded");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$m = new Model();

if($m){
    $consulta = "select * from (SELECT * FROM eu_parlamentar.questoes order by data desc limit 10) as subquery order by subquery.data asc";
    $query = $m->buscaQuestoes($consulta);
    $out = "[";
    foreach( $query as $key => $value){
        if ($out != "[") {
            $out .= ",";
        }
        $out .= '{"id": "'.$value["id_questao"].'",';
        $out .= '"data": "'.$value["data"].'",';
        $out .= '"pergunta": "'.$value["pergunta"].'",';
        $out .= '"link": "'.$value["link"].'",';
        $out .= '"codigo": "'.$value["codigo"].'",';
        $out .= '"resumo": "'.$value["resumo"].'"}';
    }
    $out .= "]";
    $out = $out;
    echo $out;

}   

?>