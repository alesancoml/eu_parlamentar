<?php

    header("Access-Control-Allow-Origin:http://localhost:8100");
    header("Content-Type: application/x-www-form-urlencoded");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    //RECUPERAÇÃO DO FORMULÁRIO
    $data = file_get_contents("php://input");
    $objData = json_decode($data);

    // TRANSFORMA OS DADOS
    $perguntas      = $objData->P;
    $respostas      = $objData->R;
    $userId         = $objData->U;
    $tz_string      = "America/Recife"; // Use one from list of TZ names http://php.net/manual/en/timezones.php 
    $tz_object      = new DateTimeZone($tz_string); 
    $datetime       = new DateTime(); 
    $datetime       ->setTimezone($tz_object); 
    $dataAtual      = $datetime->format('Y-m-d H:i:s');
    $sql            = "";
    $dados; // RECEBE ARRAY PARA RETORNO

    // INSERE OS DADOS
    @$db = new PDO("mysql:host=localhost;dbname=eu_parlamentar", "root", "");

   //VERIFICA SE TEM CONEXÃO
    if($db){

        // PREPARA QUERY
        foreach ($perguntas as $key => $value){
            if($key==0){
                $sql = "insert into opinioes values('".$value."','".$userId."','" .$respostas[$key]."','" .$dataAtual."')";
            } else {
                $sql = $sql . ",('".$value."','".$userId."','" .$respostas[$key]."','" .$dataAtual."')";
            }
        }

        $query = $db->prepare($sql);
        $query ->execute();
        if(!$query){
                   $dados = array('mensage' => "Não foi possivel enviar os dados ");
                   echo json_encode($dados);
         }
        else{
                   $dados = array('mensage' => "Os dados foram inseridos com sucesso. Obrigado e bem vindo ");
                  echo json_encode($dados);
         };
    }
   else{
          $dados = array('mensage' => "Não foi possivel iserir os dados! Tente novamente mais tarde.");
          echo json_encode($dados);
    };
?>