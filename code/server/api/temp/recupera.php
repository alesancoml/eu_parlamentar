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

        $query = $con->prepare('SELECT * FROM usuarios');

            $query->execute();

            $out = "[";

            while($result = $query->fetch()){
                if ($out != "[") {
                    $out .= ",";
                }
                $out .= '{"id": "'.$result["id_usuario"].'",';
                $out .= '"email": "'.$result["email"].'",';
                $out .= '"uf": "'.$result["estado_user"].'"}';
            }
            $out .= "]";
            echo $out;

    } catch (Exception $e) {
        echo "Erro: ". $e->getMessage();
    };
?>