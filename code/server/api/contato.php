<?php

    include './conexao.php'; 
    header("Access-Control-Allow-Origin:http://localhost:8100");
    header("Content-Type: application/x-www-form-urlencoded");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    //RECUPERAÇÃO DO FORMULÁRIO
    $data   = file_get_contents("php://input");
    $objData= json_decode($data);

    // TRANSFORMA OS DADOS
    $nome       = $objData->nome;
    $email      = $objData->email;
    $uf         = $objData->uf;
    $mensagem   = $objData->mensagem;

    // LIMPA OS DADOS
    $nome       = stripslashes($nome);
    $email      = stripslashes($email);
    $uf         = stripslashes($uf);
    $mensagem   = stripslashes($mensagem);
    $nome       = trim($nome);
    $email      = trim($email);
    $uf         = trim($uf);
    $mensagem   = trim($mensagem);

    $dados; // RECEBE ARRAY PARA RETORNO

    // PEGA A DATA
    $tz_string      = "America/Recife"; // Use one from list of TZ names http://php.net/manual/en/timezones.php 
    $tz_object      = new DateTimeZone($tz_string); 
    $datetime       = new DateTime(); 
    $datetime       ->setTimezone($tz_object); 
    $dataAtual      = $datetime->format('Y-m-d');

    // ABRE CONEXÃO
    $m = new Model();
    
   //SE TIVER CONEXÃO, TENTA A INSERÇÃO
    if($m){
        $insercao = $m->contato( 'contatos', ['NULL', $nome, $email, $uf, $mensagem, $dataAtual, 'N', ''] );
        if(!$insercao){
            $dados = array('mensage' => "Não foi possivel enviar os dados ", 'idUser' => "");
            echo json_encode($dados);
        }
        else{
            $dados = array('mensage' => "Os dados foram inseridos com sucesso. Obrigado e bem vindo ", 'idUser' => $insercao);
            echo json_encode($dados);
        };
    }
    else{
        $dados = array('mensage' => "Não foi possivel iserir os dados! Tente novamente mais tarde.", 'idUser' => "");
        echo json_encode($dados);
    };
?>