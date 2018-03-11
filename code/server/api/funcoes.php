<?php
	header("Access-Control-Allow-Origin:http://localhost:8100");
    header("Content-Type: application/x-www-form-urlencoded");
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    
    function dadosUser($userId){			//2º Pegar o estado do usuário.
        $m = new Model();
        if($m){
            $query = "id_usuario = '".$userId."' ORDER BY id_usuario desc";
            $n = new Model();
            $a = $n->read( "usuarios", $query);
            $usuario[0] = $a[0][0];
            $usuario[1] = $a[0][1];
            $usuario[2] = $a[0][2];
            return $usuario;
        }
        else{
            echo ("Problema na coleta dos dados do usuário.");
        }
    }

    function coletaOpinioes($usuario){			//3º Armazenar em lista as opiniões do usuário.
        $m = new Model();
        if($m){
            $query = "data=(SELECT data FROM eu_parlamentar.opinioes where id_usuar='".$usuario[0]."' order by data desc limit 1) order by id_quest asc";
            $a = $m->read( "opinioes", $query);
            $opinioes = [];
            foreach( $a as $key => $value){
                $opiniao[0] = $value[0];
                $opiniao[1] = $value[3];
                $opinioes[$key] = $opiniao;
            }
            return $opinioes;
        }
        else{
            echo ("Problema na coleta dos dados das opiniões do usuário.");
        }
    }

    function coletaEstados($state){
        $m = new Model();
        if($m){
            $query = "order by estado";
            $a = $m->buscaUFs("deputados");
            $estados = [];
            $state = strtolower($state);
            foreach( $a as $key => $value){
                $banco = utf8_encode($value[0]);
                $banco = strtolower($banco);
                if ($banco == $state){
                    echo $banco;
                    echo "<br>";
                }
                
               
            }
            return $estados;
        }
    }

    function coletaDeputadosDoEstado($estado){
        $m = new Model();
        if($m){
            $estado = strtoupper($estado);
            $query = "estado='".$estado."' order by nome";
            $a = $m->read( "deputados", $query);
            $deputados = [];
            foreach( $a as $key => $value){
                $deputado[0] 	= $value[0];
                $deputado[1] 	= $value[1];
                $deputado[2] 	= $value[2];
                $deputado[3]    = $value[4];
                $deputados[$key]= $deputado;
            }
            return $deputados;
        }
        else{
            echo ("Problema na coleta dos dados dos deputados.");
        }
    }

    function coletaVotos($deputados){
        $m = new Model();
        if($m){
            $lista_geral_de_votos = [];
            foreach( $deputados as $key1 => $value1){
                $deputId 		= $value1[0];
                $deputNome 		= $value1[1];
                $deputPartido 	= $value1[2];
                $query = "id_deput='".$deputId."' order by id_quest asc";
                $a = $m->read( "votos", $query);
                $votos = [];
                foreach( $a as $key2 => $value2){
                    $voto[0] 	= $value2[0];
                    $voto[1] 	= $value2[2];
                    $votos[$key2]= $voto;
                }
                $lista_geral_de_votos[$key1] = [$deputId,$votos];
            }
            return $lista_geral_de_votos;
        }
        else{
            echo ("Problema na coleta dos dados dos deputados.");
        }
    }

    function calculaScore($listaOpinioes,$listaVotos,$deputados){

        $tamanhoUsuario = count($listaOpinioes);
        $opinioes 		= [];
        $listaGeralScores = [];
                
        foreach( $listaVotos as $key1 => $value1){	//VARREDURA EM CADA DEPUTADO
            $score 			= 0.0;
            $matchs			= 0;
            $votos 			= [];
            $historico 		= [];
            $idDeput 		= $value1[0];
            $nome           = "";
            $partido        = "";
            $foto           = "";
            $vot1 = [];	//número das perguntas votadas
            $vot2 = []; //resposta das perguntas votadas

            foreach( $deputados as $key => $deputado){
                if (in_array($idDeput, $deputado)) { 		//VERIFICA SE A QUESTÃO FOI VOTADA PELO DEPUTADO
                    $nome = $deputado[1];
                    $partido = $deputado[2];
                    $foto = $deputado[3];
                    break;
                }
            }
            
    
            foreach( $value1[1] as $key2 => $value2){ //COLETA DO NÚMERO DAS PERGUNTAS VOTADAS PELO DEPUTADO
                array_push($vot1, $value2[0]);
                array_push($vot2, $value2[1]);
            }
            
            foreach($listaOpinioes as $key2 => $value2){ //LAÇO SOB AS OPINIÕES DO USUÁRIO
                if (in_array($value2[0], $vot1)) { 		//VERIFICA SE A QUESTÃO FOI VOTADA PELO DEPUTADO
                    $posicao = array_search($value2[0], $vot1);
                    $temp = [];
                    array_push($temp,$vot1[$posicao]);
                    array_push($temp,$vot2[$posicao]);
                    array_push($historico,$temp);
                    
                    if($value2[1]==$vot2[$posicao]){
                        $matchs	= $matchs + 1;
                    }
                }
                else{
                    $temp = [];
                    array_push($temp,$value2[0]);
                    array_push($temp,"Ausente");
                    array_push($historico,$temp);
                }
            }
    
            $score = ceil(($matchs/$tamanhoUsuario)*100);	//CÁLCULO DO SCORE
            
            $temp = [];
            array_push($temp,$idDeput);
            array_push($temp,$nome);
            array_push($temp,$partido);
            array_push($temp,$score);
            array_push($temp,$foto);
            array_push($temp,$historico);
            array_push($listaGeralScores,$temp);
        }
        //ORDENAÇÃO DECRESCENTE DE DEPUTADOS DE ACORDO COM SEU SCORE
        $sortArray = array(); 
        foreach($listaGeralScores as $person){ 
            foreach($person as $key=>$value){ 
                if(!isset($sortArray[$key])){ 
                    $sortArray[$key] = array(); 
                } 
                $sortArray[$key][] = $value; 
            } 
        } 
        array_multisort($sortArray[3],SORT_DESC,$listaGeralScores); 
        
        return $listaGeralScores;
        
    }

    // TESTES
    // $a = coletaDeputadosDoEstado("RIO DE JANEIRO");
    // //print_r($a);
    // foreach( $a as $key => $deputado){
    //     $nome = $deputado[1];
    //     echo $nome;
    //     echo "<br>";
    // }
?>