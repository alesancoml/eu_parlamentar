<?php

include './funcoes.php'; 

header("Access-Control-Allow-Origin:http://localhost:8100");
header("Content-Type: application/x-www-form-urlencoded");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


function buscaResultados($userId, $uf){
    
    $usuario 	= dadosUser($userId);
    $estado 	= $uf;
    $opinioes 	= coletaOpinioes($usuario);
    $deputados 	= coletaDeputadosDoEstado($estado);
    $votos 		= coletaVotos($deputados);
    $scores		= calculaScore($opinioes,$votos,$deputados);		//[[480, 80%, [[1,Sim],[2,Nao],[3,Sim]]],[481, 60%, [[1,Sim],[2,Nao],[3,Sim]]]]
    $dados		= array('mensage' => "Os dados foram comparados com sucesso.", 'estado' => $estado, 'opinioes' => $opinioes, 'scores' => $scores);
    return $dados;
    
}
?>