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

    //######################################################################################################
    // ENVIA O EMAIL
    
    //REMETENTE --> ESTE EMAIL TEM QUE SER VALIDO DO DOMINIO
    //==================================================== 
    $email_remetente = $email; // deve ser uma conta de email do seu dominio 
    //====================================================

    //Configurações do email, ajustar conforme necessidade
    //==================================================== 
    $email_destinatario = "eusouparlamentar@gmail.com"; // pode ser qualquer email que receberá as mensagens
    $email_reply = $email; 
    $email_assunto = "Contato - ".$email; // Este será o assunto da mensagem
    //====================================================

    //Monta o Corpo da Mensagem
    //====================================================
    $corpo		= "<html><body>";
    $corpo 	   .= "<strong> Mensagem de Contato pelo Site</strong><br><br>";
    $corpo 	   .= "<table border=1 solid #000000 cellpadding=5 cellspacing=0 width=500";
    $corpo	   .= "<tr><td bgcolor=#cccccc valing=middle width=20%><strong> Nome: 		</strong></td valing=middle><td> $nome </td></tr>";
    $corpo	   .= "<tr><td bgcolor=#cccccc valing=middle width=20%><strong> Email: 	</strong></td valing=middle><td> $email </td></tr>";
    $corpo	   .= "<tr><td bgcolor=#cccccc valing=middle width=20%><strong> UF: 	</strong></td valing=middle><td> $uf </td></tr>";
    $corpo	   .= "<tr><td bgcolor=#cccccc valing=middle width=20%><strong> Mensagem: 	</strong></td valing=middle><td> $mensagem </td></tr>";
    $corpo     .= "</table></body></html>";
    //====================================================

    //Seta os Headers (Alterar somente caso necessario) 
    //==================================================== 
    $email_headers = implode ( "\n",array ( "From: $email_remetente", "Reply-To: $email_reply", "Return-Path: $email_remetente","MIME-Version: 1.0","X-Priority: 3","Content-Type: text/html; charset=UTF-8" ) );
    //====================================================

    //Enviando o email 
    //==================================================== 
    if (mail ($email_destinatario, $email_assunto, nl2br($corpo), $email_headers)){ 
        $a = "ok"; 
    } 
    else{
        $a = "falha";
    }  
    //######################################################################################################

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