<?php
    header("Access-Control-Allow-Origin: *");
    header('Content-Type: text/html; charset=utf-8');

    $dns = "mysql:host=localhost;dbname=eu_parlamentar";
    $user = "root";
    $pass = "";

    try {
        $con = new PDO($dns, $user, $pass);

        if(!$con){
            echo "Não foi possivel conectar com Banco de Dados!";
        }		

        $query = $con->prepare('SELECT * FROM questoes');

            $query->execute();

            $out = "[";

            while($result = $query->fetch()){
                if ($out != "[") {
                    $out .= ",";
                }
                $out .= '{"id": "'.$result["id_questao"].'",';
                $out .= '"data": "'.$result["data"].'",';
                $out .= '"pergunta": "'.$result["pergunta"].'",';
                $out .= '"link": "'.$result["link"].'",';
                $out .= '"codigo": "'.$result["codigo"].'"}';
            }
            $out .= "]";
            $out = utf8_encode($out);
            echo $out;

    } catch (Exception $e) {
        echo "Erro: ". $e->getMessage();
    };
?>