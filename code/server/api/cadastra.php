<?php

    include './conexao.php'; 
    header("Access-Control-Allow-Origin:http://localhost:8100");
    header("Content-Type: application/x-www-form-urlencoded");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    //RECUPERAÇÃO DO FORMULÁRIO
    $data   = file_get_contents("php://input");
    $objData= json_decode($data);

    // TRANSFORMA OS DADOS
    $email  = $objData->email;
    $uf     = $objData->uf;

    // LIMPA OS DADOS
    $email  = stripslashes($email);
    $uf     = stripslashes($uf);
    $email  = trim($email);
    $uf     = trim($uf);

    $dados; // RECEBE ARRAY PARA RETORNO

    // ABRE CONEXÃO
    $m = new Model();
    
   //SE TIVER CONEXÃO, TENTA A INSERÇÃO
    if($m){
        $insercao = $m->insereUsuario( 'usuarios', ['NULL', $email, $uf] );
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