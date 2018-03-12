<?php

    include './conexao.php'; 
    include './similaridades.php'; 

    header("Access-Control-Allow-Origin:http://localhost:8100");
    header("Content-Type: application/x-www-form-urlencoded");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    // RECUPERAÇÃO DO FORMULÁRIO
    $data = file_get_contents("php://input");
    $objData = json_decode($data);

    // TRANSFORMA OS DADOS
    $perguntas      = $objData->P;
    $respostas      = $objData->R;
    $userId         = $objData->U;
    $estado         = $objData->E;
    $estado2         = $estado;

    // $perguntas      = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    // $respostas      = ["Nao", "Nao", "Nao", "Nao", "Nao", "Nao", "Nao", "Nao", "Nao", "Nao"];
    // $userId         = "1";
    // $estado         = "pernambuco";
    // $estado2        = utf8_decode($estado);

    $tz_string      = "America/Recife"; // Use one from list of TZ names http://php.net/manual/en/timezones.php 
    $tz_object      = new DateTimeZone($tz_string); 
    $datetime       = new DateTime(); 
    $datetime       ->setTimezone($tz_object); 
    $dataAtual      = $datetime->format('Y-m-d H:i:s');
    $sql            = "";
    $dados; // RECEBE ARRAY PARA RETORNO

    $n = new Model();
    $query = "nome = '".$estado2."' ORDER BY id_estado asc";
    $a = $n->read( "estados", $query);
    $id_estado = "";
    if ($a){
        $id_estado = $a[0][0];
        $m = new Model();
    
        if($m){
            $flag = 0;
            foreach ($perguntas as $key => $value){
                $insercao = $m->insereResposta( 'opinioes', [$value, $userId, $id_estado, $respostas[$key], $dataAtual] );
                if(!$insercao){
                    $flag = 1;
                }
            }
            if ($flag){
                $dados = array('mensage' => "Problema no envio");
                echo json_encode($dados);
            }
            else{
                // $opinioes = $busca["opinioes"];
                // $dados = array('mensage' => "Os dados foram inseridos com sucesso.", 'id' => $userId, 'estado' => $estado, 'opinioes' => $opinioes);
                // echo json_encode($dados);
                $busca = buscaResultados($userId, $estado);
                $opinioes = $busca["opinioes"];
                $pontuacao = $busca["scores"];
                $dados = array('mensage' => "Os dados foram inseridos com sucesso.", 'id' => $userId, 'estado' => $estado, 'opinioes' => $opinioes, 'pontuacao' => $pontuacao);
                echo json_encode($dados);
            }
    
        }
    }

?>