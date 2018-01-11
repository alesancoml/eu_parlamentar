<?php

include './conexao.php'; 
include './similaridades.php'; 

$userId = 1;
$scores = buscaResultados($userId);

$estado = $scores["estado"];
$opinioes = $scores["opinioes"];
$deputados = $scores["deputados"];
$pontuacao = $scores["scores"];

$dados = array('mensage' => "Os dados foram inseridos com sucesso.", 'id' => $userId, 'estado' => $estado, 'opinioes' => $opinioes, 'deputados' => $deputados, 'pontuacao' => $pontuacao);
echo json_encode($dados);

?>